package com.spb.tradeX.service;

import com.spb.tradeX.dto.ChangePasswordRequest;
import com.spb.tradeX.dto.UpdateProfileRequest;
import com.spb.tradeX.dto.UserResponse;

public interface ProfileService {

    UserResponse getProfile(Long userId);

    UserResponse updateProfile(
            Long userId,
            UpdateProfileRequest request
    );

    void changePassword(
            Long userId,
            ChangePasswordRequest request
    );
}