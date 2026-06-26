package com.spb.tradeX.service.impl;

import com.spb.tradeX.dto.LoginRequest;
import com.spb.tradeX.dto.LoginResponse;
import com.spb.tradeX.dto.RegisterRequest;
import com.spb.tradeX.dto.UserResponse;
import com.spb.tradeX.model.User;
import com.spb.tradeX.repository.UserRepository;
import com.spb.tradeX.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(request.getPassword())
                .mobile(request.getMobile())
                .build();

        User savedUser = userRepository.save(user);

        return mapToUserResponse(savedUser);
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        UserResponse userResponse = mapToUserResponse(user);

        return LoginResponse.builder()
                .message("Login successful")
                .user(userResponse)
                .build();
    }

    @Override
    public UserResponse getProfile(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToUserResponse(user);
    }

    private UserResponse mapToUserResponse(User user) {

        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .mobile(user.getMobile())
                .walletBalance(user.getWalletBalance())
                .role(user.getRole())
                .build();
    }
}