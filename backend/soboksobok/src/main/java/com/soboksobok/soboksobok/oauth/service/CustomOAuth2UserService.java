package com.soboksobok.soboksobok.oauth.service;

import com.soboksobok.soboksobok.domain.user.User;
import com.soboksobok.soboksobok.repository.user.UserRepository;
import com.soboksobok.soboksobok.oauth.entity.ProviderType;
import com.soboksobok.soboksobok.oauth.entity.RoleType;
import com.soboksobok.soboksobok.oauth.entity.UserPrincipal;
import com.soboksobok.soboksobok.oauth.exception.OAuthProviderMissMatchException;
import com.soboksobok.soboksobok.oauth.info.OAuth2UserInfo;
import com.soboksobok.soboksobok.oauth.info.OAuth2UserInfoFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("CustomOAuth2UserService - loadUser");
        OAuth2User user = super.loadUser(userRequest);

        try {
            return this.process(userRequest, user);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
        System.out.println("CustomOAuth2UserService - process");
        ProviderType providerType = ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
        User savedUser = userRepository.findByUserId(userInfo.getId());

        if (savedUser != null) {
            if (providerType != savedUser.getProviderType()) {
                throw new OAuthProviderMissMatchException(
                        "Looks like you're signed up with " + providerType +
                        " account. Please use your " + savedUser.getProviderType() + " account to login."
                );
            }
            updateUser(savedUser, userInfo);
        } else {
            savedUser = createUser(userInfo, providerType);
        }

        return UserPrincipal.create(savedUser, user.getAttributes());
    }

    private User createUser(OAuth2UserInfo userInfo, ProviderType providerType) {
        System.out.println("CustomOAuth2UserService - createUser");
        LocalDateTime now = LocalDateTime.now();
        User user = new User(
                userInfo.getId(),
                userInfo.getName(),
//                userInfo.getEmail(),
//                "Y",
                userInfo.getImageUrl(),
                providerType,
                RoleType.USER,
                now,
                now
        );


        return userRepository.saveAndFlush(user);
    }

    private User updateUser(User user, OAuth2UserInfo userInfo) {
        System.out.println("CustomOAuth2UserService - updateUser");
        System.out.println("유저는: "+userInfo);
        if (userInfo.getName() != null && !user.getUsername().equals(userInfo.getName())) {
            System.out.println("유저 이름 갱신");
            user.setUsername(userInfo.getName());
        }

        if (userInfo.getImageUrl() != null && !user.getProfileImageUrl().equals(userInfo.getImageUrl())) {
            System.out.println("유저 프사 갱신");
            user.setProfileImageUrl(userInfo.getImageUrl());
        }

//        if(userInfo.getAgeRange() != null && !user.getAgeRange().equals(userInfo.getAgeRange())){
//            user.setAgeRange(userInfo.getAgeRange());
//        }
//
//        if(userInfo.getGender() != null && !user.getGender().equals(userInfo.getGender())){
//            user.setGender(userInfo.getGender());
//        }
//
//        if(userInfo.getBirth() != null && !user.getBirth().equals(userInfo.getBirth())){
//            user.setBirth(userInfo.getBirth());
//        }

        return user;
    }
}
