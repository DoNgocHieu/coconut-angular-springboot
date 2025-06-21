package com.coconutmusic.controller;

import com.coconutmusic.dto.request.LoginRequest;
import com.coconutmusic.dto.request.RegisterRequest;
import com.coconutmusic.dto.response.ApiResponse;
import com.coconutmusic.dto.response.AuthResponse;
import com.coconutmusic.service.AuthService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = authService.login(loginRequest);
        return ResponseEntity.ok(ApiResponse.success("Login successful", authResponse));
    }    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        ApiResponse response = authService.register(registerRequest);
        return ResponseEntity.ok(response);
    }    @GetMapping("/verify")
    public ResponseEntity<ApiResponse> verifyEmailGet(@RequestParam String token) {
        authService.verifyEmail(token);
        return ResponseEntity.ok(ApiResponse.success("Email verified successfully. You can now access all features."));
    }

    @PostMapping("/verify")
    public ResponseEntity<ApiResponse> verifyEmailPost(@RequestParam String token) {
        authService.verifyEmail(token);
        return ResponseEntity.ok(ApiResponse.success("Email verified successfully. You can now access all features."));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@RequestParam @Email String email) {
        authService.forgotPassword(email);
        return ResponseEntity.ok(ApiResponse.success("Password reset link has been sent to your email."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestParam String token,
            @RequestParam @NotBlank String newPassword) {
        authService.resetPassword(token, newPassword);
        return ResponseEntity.ok(ApiResponse.success("Password reset successfully. You can now login with your new password."));
    }    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout() {
        // For JWT, logout is handled on client side by removing the token
        return ResponseEntity.ok(ApiResponse.success("Logout successful"));
    }

    // DEBUG ENDPOINT - Remove in production
    @GetMapping("/debug/verify-token/{username}")
    public ResponseEntity<ApiResponse> getVerifyToken(@PathVariable String username) {
        return ResponseEntity.ok(authService.getVerifyTokenForDebug(username));
    }
}
