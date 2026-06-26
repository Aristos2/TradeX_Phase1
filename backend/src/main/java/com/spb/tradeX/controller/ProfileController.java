package com.spb.tradeX.controller;

import com.spb.tradeX.dto.UserResponse;
import com.spb.tradeX.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserService userService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public UserResponse getProfile(@PathVariable Long userId) {
        return userService.getProfile(userId);
    }
}