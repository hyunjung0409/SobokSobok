package com.soboksobok.soboksobok.service;

import com.soboksobok.soboksobok.domain.welfare.Welfare;
import com.soboksobok.soboksobok.repository.welfare.WelfareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WelfareService {

    @Autowired
    private final WelfareRepository welfareRepository;

    public Welfare getWelfare(Long welfare_id) {
        return welfareRepository.findByWelfareId(welfare_id);
    }

    public List<Welfare> getWelfarebykeyword(String keyword) {
        return welfareRepository.searchWelfare(keyword);
    }

    public List<Welfare> getSimilarWelfare(Long welfare_id) {
        return welfareRepository.getSimilar(welfare_id);
    }

    public List<Welfare> getWelfarebygroup(Long group_id) {
        return welfareRepository.getGroupWelfare(group_id);
    }
//    public List<Array> getWelfarepurpose(List<Welfare> welfares) { return welfareRepository.exportWelfarePurpose(welfares);}
}
