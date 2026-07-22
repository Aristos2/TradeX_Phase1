package com.spb.tradeX.controller;

import com.spb.tradeX.dto.LoginRequest;
import com.spb.tradeX.dto.LoginResponse;
import com.spb.tradeX.dto.RegisterRequest;
import com.spb.tradeX.dto.UserResponse;
import com.spb.tradeX.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}