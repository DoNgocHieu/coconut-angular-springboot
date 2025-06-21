package com.coconutmusic.controller;

import com.coconutmusic.dto.response.ApiResponse;
import com.coconutmusic.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    /**
     * Get dashboard statistics
     */
    @GetMapping("/dashboard/stats")
    public ResponseEntity<ApiResponse> getDashboardStats() {
        Map<String, Object> stats = adminService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.success("Dashboard stats retrieved successfully", stats));
    }

    /**
     * Get music statistics by category
     */
    @GetMapping("/dashboard/music-by-category")
    public ResponseEntity<ApiResponse> getMusicStatsByCategory() {
        Map<String, Object> stats = adminService.getMusicStatsByCategory();
        return ResponseEntity.ok(ApiResponse.success("Music stats by category retrieved successfully", stats));
    }

    /**
     * Get top played music
     */
    @GetMapping("/dashboard/top-played")
    public ResponseEntity<ApiResponse> getTopPlayedMusic(
            @RequestParam(defaultValue = "10") int limit) {
        var topPlayed = adminService.getTopPlayedMusic(limit);
        return ResponseEntity.ok(ApiResponse.success("Top played music retrieved successfully", topPlayed));
    }

    /**
     * Get user registration trends (last 30 days)
     */
    @GetMapping("/dashboard/user-trends")
    public ResponseEntity<ApiResponse> getUserRegistrationTrends() {
        var trends = adminService.getUserRegistrationTrends();
        return ResponseEntity.ok(ApiResponse.success("User registration trends retrieved successfully", trends));
    }

    /**
     * Get system health status
     */
    @GetMapping("/system/health")
    public ResponseEntity<ApiResponse> getSystemHealth() {
        Map<String, Object> health = adminService.getSystemHealth();
        return ResponseEntity.ok(ApiResponse.success("System health retrieved successfully", health));
    }
}
