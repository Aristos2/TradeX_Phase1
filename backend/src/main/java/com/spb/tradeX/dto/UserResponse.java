package com.spb.tradeX.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;

    private String fullName;

    private String firstName;

    private String lastName;

    private String email;

    private String mobile;

    private String bio;

    private LocalDate dateOfBirth;

    private String profileImageUrl;

    private BigDecimal walletBalance;

    private String role;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}