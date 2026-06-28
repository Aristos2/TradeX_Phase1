package com.spb.tradeX.service.impl;

import com.spb.tradeX.dto.ChangePasswordRequest;
import com.spb.tradeX.dto.UpdateProfileRequest;
import com.spb.tradeX.dto.UserResponse;
import com.spb.tradeX.exception.InvalidPasswordException;
import com.spb.tradeX.exception.UserNotFoundException;
import com.spb.tradeX.model.User;
import com.spb.tradeX.repository.UserRepository;
import com.spb.tradeX.service.ProfileService;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;

    public ProfileServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponse getProfile(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .mobile(user.getMobile())
                .bio(user.getBio())
                .dateOfBirth(user.getDateOfBirth())
                .profileImageUrl(user.getProfileImageUrl())
                .walletBalance(user.getWalletBalance())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    @Override
    public UserResponse updateProfile(Long userId, UpdateProfileRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setMobile(request.getMobile());
        user.setBio(request.getBio());
        user.setDateOfBirth(request.getDateOfBirth());

        // Keep fullName in sync
        user.setFullName(
                request.getFirstName() + " " + request.getLastName()
        );

        User updatedUser = userRepository.save(user);

        return UserResponse.builder()
                .id(updatedUser.getId())
                .fullName(updatedUser.getFullName())
                .firstName(updatedUser.getFirstName())
                .lastName(updatedUser.getLastName())
                .email(updatedUser.getEmail())
                .mobile(updatedUser.getMobile())
                .bio(updatedUser.getBio())
                .dateOfBirth(updatedUser.getDateOfBirth())
                .profileImageUrl(updatedUser.getProfileImageUrl())
                .walletBalance(updatedUser.getWalletBalance())
                .role(updatedUser.getRole())
                .createdAt(updatedUser.getCreatedAt())
                .updatedAt(updatedUser.getUpdatedAt())
                .build();
    }

    @Override
    public void changePassword(Long userId, ChangePasswordRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        if (!user.getPassword().equals(request.getOldPassword())) {
            throw new InvalidPasswordException("Old password is incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new InvalidPasswordException(
                    "New password and confirm password do not match");
        }

        user.setPassword(request.getNewPassword());

        userRepository.save(user);
    }
}