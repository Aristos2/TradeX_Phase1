package com.spb.tradeX.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Existing field (keep for compatibility)
    private String fullName;

    // New profile fields
    private String firstName;

    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String mobile;

    @Column(length = 500)
    private String bio;

    private LocalDate dateOfBirth;

    private String profileImageUrl;

    // Existing project fields
    private BigDecimal walletBalance;

    private String role;

    // Audit fields
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (walletBalance == null) {
            walletBalance = new BigDecimal("100000");
        }

        if (role == null) {
            role = "USER";
        }
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}