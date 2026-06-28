package com.spb.tradeX.controller;

import com.spb.tradeX.dto.ChangePasswordRequest;
import com.spb.tradeX.dto.UpdateProfileRequest;
import com.spb.tradeX.dto.UserResponse;
import com.spb.tradeX.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getProfile(
            @PathVariable Long userId) {

        UserResponse response = profileService.getProfile(userId);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserResponse> updateProfile(
            @PathVariable Long userId,
            @Valid @RequestBody UpdateProfileRequest request) {

        UserResponse response =
                profileService.updateProfile(userId, request);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{userId}/password")
    public ResponseEntity<String> changePassword(
            @PathVariable Long userId,
            @Valid @RequestBody ChangePasswordRequest request) {

        profileService.changePassword(userId, request);

        return ResponseEntity.ok("Password changed successfully.");
    }
}