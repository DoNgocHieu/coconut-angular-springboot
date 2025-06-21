package com.coconutmusic.controller;

import com.coconutmusic.dto.request.CategoryCreateRequest;
import com.coconutmusic.dto.request.CategoryUpdateRequest;
import com.coconutmusic.dto.response.ApiResponse;
import com.coconutmusic.entity.Category;
import com.coconutmusic.service.AdminCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/categories")
@CrossOrigin(origins = "*")
// @PreAuthorize("hasRole('ADMIN')") // Temporarily disabled for testing
public class AdminCategoryController {

    @Autowired
    private AdminCategoryService adminCategoryService;

    /**
     * Get all categories with pagination
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getAllCategories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean isActive) {

        Sort sort = sortDir.equals("desc") ?
            Sort.by(sortBy).descending() :
            Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Category> categoryPage = adminCategoryService.getAllCategories(
            pageable, search, isActive);

        return ResponseEntity.ok(ApiResponse.success("Categories retrieved successfully", categoryPage));
    }

    /**
     * Get category by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getCategoryById(@PathVariable Long id) {
        Category category = adminCategoryService.getCategoryById(id);
        return ResponseEntity.ok(ApiResponse.success("Category retrieved successfully", category));
    }

    /**
     * Create new category
     */
    @PostMapping
    public ResponseEntity<ApiResponse> createCategory(@Valid @RequestBody CategoryCreateRequest request) {
        Category category = adminCategoryService.createCategory(request);
        return ResponseEntity.ok(ApiResponse.success("Category created successfully", category));
    }

    /**
     * Update category
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryUpdateRequest request) {
        Category category = adminCategoryService.updateCategory(id, request);
        return ResponseEntity.ok(ApiResponse.success("Category updated successfully", category));
    }

    /**
     * Delete category
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Long id) {
        adminCategoryService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.success("Category deleted successfully"));
    }

    /**
     * Toggle category active status
     */
    @PatchMapping("/{id}/toggle-active")
    public ResponseEntity<ApiResponse> toggleActiveStatus(@PathVariable Long id) {
        Category category = adminCategoryService.toggleActiveStatus(id);
        return ResponseEntity.ok(ApiResponse.success("Category status updated successfully", category));
    }

    /**
     * Get category statistics
     */
    @GetMapping("/{id}/stats")
    public ResponseEntity<ApiResponse> getCategoryStats(@PathVariable Long id) {
        var stats = adminCategoryService.getCategoryStats(id);
        return ResponseEntity.ok(ApiResponse.success("Category stats retrieved successfully", stats));
    }
}
