package com.coconutmusic.controller;

import com.coconutmusic.dto.request.UserCreateRequest;
import com.coconutmusic.dto.request.UserUpdateRequest;
import com.coconutmusic.dto.response.ApiResponse;
import com.coconutmusic.entity.User;
import com.coconutmusic.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "*")
// @PreAuthorize("hasRole('ADMIN')") // Temporarily disabled for testing
public class AdminUserController {

    @Autowired
    private AdminUserService adminUserService;

    /**
     * Get all users with pagination and filtering
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean isVerified,
            @RequestParam(required = false) Boolean isAdmin) {

        Sort sort = sortDir.equals("desc") ?
            Sort.by(sortBy).descending() :
            Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<User> userPage = adminUserService.getAllUsers(
            pageable, search, isVerified, isAdmin);        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", userPage));
    }

    /**
     * Create a new user
     */
    @PostMapping
    public ResponseEntity<ApiResponse> createUser(@Valid @RequestBody UserCreateRequest request) {
        User user = adminUserService.createUser(request);
        return ResponseEntity.ok(ApiResponse.success("User created successfully", user));
    }

    /**
     * Get user by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long id) {
        User user = adminUserService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.success("User retrieved successfully", user));
    }

    /**
     * Update user
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateRequest request) {
        User user = adminUserService.updateUser(id, request);
        return ResponseEntity.ok(ApiResponse.success("User updated successfully", user));
    }

    /**
     * Delete user
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {
        adminUserService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully"));
    }

    /**
     * Toggle user admin status
     */
    @PatchMapping("/{id}/toggle-admin")
    public ResponseEntity<ApiResponse> toggleAdminStatus(@PathVariable Long id) {
        User user = adminUserService.toggleAdminStatus(id);
        return ResponseEntity.ok(ApiResponse.success("User admin status updated successfully", user));
    }

    /**
     * Toggle user verified status
     */
    @PatchMapping("/{id}/toggle-verified")
    public ResponseEntity<ApiResponse> toggleVerifiedStatus(@PathVariable Long id) {
        User user = adminUserService.toggleVerifiedStatus(id);
        return ResponseEntity.ok(ApiResponse.success("User verified status updated successfully", user));
    }

    /**
     * Get user statistics
     */
    @GetMapping("/{id}/stats")
    public ResponseEntity<ApiResponse> getUserStats(@PathVariable Long id) {
        var stats = adminUserService.getUserStats(id);
        return ResponseEntity.ok(ApiResponse.success("User stats retrieved successfully", stats));
    }

    /**
     * Bulk operations
     */
    @PostMapping("/bulk-delete")
    public ResponseEntity<ApiResponse> bulkDeleteUsers(@RequestBody Long[] userIds) {
        adminUserService.bulkDeleteUsers(userIds);
        return ResponseEntity.ok(ApiResponse.success("Users deleted successfully"));
    }

    @PostMapping("/bulk-toggle-verified")
    public ResponseEntity<ApiResponse> bulkToggleVerified(
            @RequestBody Long[] userIds,
            @RequestParam boolean verified) {
        adminUserService.bulkToggleVerified(userIds, verified);
        return ResponseEntity.ok(ApiResponse.success("Users verified status updated successfully"));
    }
}
