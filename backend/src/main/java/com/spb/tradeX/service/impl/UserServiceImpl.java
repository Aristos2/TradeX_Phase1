package com.spb.tradeX.service.impl;

import com.spb.tradeX.Security.JwtService;
import com.spb.tradeX.dto.LoginRequest;
import com.spb.tradeX.dto.LoginResponse;
import com.spb.tradeX.dto.RegisterRequest;
import com.spb.tradeX.dto.UserResponse;
import com.spb.tradeX.model.User;
import com.spb.tradeX.repository.UserRepository;
import com.spb.tradeX.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @Override
    public UserResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .mobile(request.getMobile())
                .build();

        User savedUser = userRepository.save(user);

        return mapToUserResponse(savedUser);
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User Is not Database"));

        String token = jwtService.generateToken(user);

        UserResponse userResponse = mapToUserResponse(user);

        return LoginResponse.builder()
                .message("Login successful")
                .token(token)
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