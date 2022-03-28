package com.soboksobok.soboksobok.domain.dto;

import lombok.Data;

import java.util.List;

@Data
public class CharacterDto {
    private String child;
    private String region;
    private List<Long> job;
    private List<Long> family;
}
