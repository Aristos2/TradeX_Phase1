package com.spb.tradeX.service;

import com.spb.tradeX.dto.LoginRequest;
import com.spb.tradeX.dto.LoginResponse;
import com.spb.tradeX.dto.RegisterRequest;
import com.spb.tradeX.dto.UserResponse;

public interface UserService {

    UserResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    UserResponse getProfile(Long userId);

}
