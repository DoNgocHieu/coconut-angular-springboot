package com.coconutmusic.service;

import com.coconutmusic.dto.request.LoginRequest;
import com.coconutmusic.dto.request.RegisterRequest;
import com.coconutmusic.dto.response.ApiResponse;
import com.coconutmusic.dto.response.AuthResponse;
import com.coconutmusic.entity.User;
import com.coconutmusic.exception.BadRequestException;
import com.coconutmusic.exception.ResourceNotFoundException;
import com.coconutmusic.repository.UserRepository;
import com.coconutmusic.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private EmailService emailService;    public AuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        User user = userRepository.findByUsernameOrEmail(
                loginRequest.getUsernameOrEmail(),
                loginRequest.getUsernameOrEmail()
        ).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Check if user email is verified
        if (!user.getIsVerified()) {
            throw new BadRequestException("Please verify your email before logging in. Check your inbox for the verification link.");
        }

        String accessToken = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);

        return new AuthResponse(accessToken, refreshToken, user.getId(),
                               user.getUsername(), user.getEmail(), user.getIsAdmin());
    }    public ApiResponse register(RegisterRequest registerRequest) {
        // Check if username exists
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new BadRequestException("Username is already taken!");
        }

        // Check if email exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BadRequestException("Email is already in use!");
        }

        // Create new user
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setIsVerified(false);
        user.setIsAdmin(false);

        // Generate verification token
        String verifyToken = UUID.randomUUID().toString();
        user.setVerifyToken(verifyToken);
        user.setVerifyTokenExpiry(LocalDateTime.now().plusHours(24));

        User savedUser = userRepository.save(user);

        // Send verification email
        try {
            emailService.sendVerificationEmail(savedUser.getEmail(), verifyToken);
        } catch (Exception e) {
            // Log error but don't fail registration
            e.printStackTrace();
        }

        return new ApiResponse(true, "Registration successful. Please check your email to verify your account before logging in.",
                              Map.of("username", savedUser.getUsername(), "email", savedUser.getEmail()));
    }    public void verifyEmail(String token) {
        // First try to find user by the valid token
        User user = userRepository.findByValidVerifyToken(token, LocalDateTime.now())
                .orElse(null);

        if (user == null) {
            // Token is not valid anymore, let's check if any user has been verified recently
            // by checking all users and looking for the pattern - this is a simpler approach
            // since we don't store token history

            // Try to get the user through different means or just assume token is invalid/expired
            throw new BadRequestException("Invalid or expired verification token. If you recently verified your email, you can proceed to login.");
        }

        // User found with valid token, proceed with verification
        user.setIsVerified(true);
        user.setVerifyToken(null);
        user.setVerifyTokenExpiry(null);
        userRepository.save(user);

        // Send welcome email after successful verification
        try {
            emailService.sendWelcomeEmail(user.getEmail(), user.getUsername());
        } catch (Exception e) {
            // Log error but don't fail verification
            e.printStackTrace();
        }
    }

    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        String resetToken = UUID.randomUUID().toString();
        user.setForgotPasswordToken(resetToken);
        user.setForgotPasswordTokenExpiry(LocalDateTime.now().plusHours(1));
        userRepository.save(user);

        // Send reset password email
        try {
            emailService.sendPasswordResetEmail(user.getEmail(), resetToken);
        } catch (Exception e) {
            throw new BadRequestException("Failed to send reset password email");
        }
    }    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByValidForgotPasswordToken(token, LocalDateTime.now())
                .orElseThrow(() -> new BadRequestException("Invalid or expired reset token"));

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setForgotPasswordToken(null);
        user.setForgotPasswordTokenExpiry(null);
        userRepository.save(user);
    }

    // DEBUG METHOD - Remove in production
    public ApiResponse getVerifyTokenForDebug(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return new ApiResponse(true, "Debug info",
                              Map.of("username", user.getUsername(),
                                     "email", user.getEmail(),
                                     "isVerified", user.getIsVerified(),
                                     "verifyToken", user.getVerifyToken()));
    }
}
