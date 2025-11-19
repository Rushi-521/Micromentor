package com.micromentor.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long userId;
    private String username;
    private String email;
    private Integer reputationScore;
    private Integer totalSessionsTaught;
    private Integer totalSessionsLearned;
    private Boolean isVerified;
    private Double latitude;
    private Double longitude;
}