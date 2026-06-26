package com.spb.tradeX.controller;

import com.spb.tradeX.dto.LoginRequest;
import com.spb.tradeX.dto.LoginResponse;
import com.spb.tradeX.dto.RegisterRequest;
import com.spb.tradeX.dto.UserResponse;
import com.spb.tradeX.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}