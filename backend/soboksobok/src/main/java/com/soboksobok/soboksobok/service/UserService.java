package com.soboksobok.soboksobok.service;

import com.soboksobok.soboksobok.domain.user.Likewelfare;
import com.soboksobok.soboksobok.domain.user.Usedwelfare;
import com.soboksobok.soboksobok.domain.user.User;
import com.soboksobok.soboksobok.repository.user.LikeWelfareRepository;
import com.soboksobok.soboksobok.repository.user.UsedwelfareRepository;
import com.soboksobok.soboksobok.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UsedwelfareRepository userUsedRepository;
    private final LikeWelfareRepository likeWelfareRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }

    public List<Usedwelfare> getUsed(User userSeq){
        System.out.println("userSeq: "+userSeq.getUserSeq());
        List<Usedwelfare> li = userUsedRepository.findAllByUserSeq_UserSeq(userSeq.getUserSeq());
        System.out.println(li);
        return li;
    }

    public List<Likewelfare> getLike(User user){
        List<Likewelfare> li = likeWelfareRepository.findAllByUserSeq_UserSeq(user.getUserSeq());
        return li;
    }
}
