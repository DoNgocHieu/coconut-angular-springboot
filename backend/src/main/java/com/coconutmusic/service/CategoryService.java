package com.coconutmusic.service;

import com.coconutmusic.entity.Category;
import com.coconutmusic.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public ResponseEntity<Map<String, Object>> getAllCategories() {
        try {
            List<Category> categories = categoryRepository.findByIsActiveTrueWithMusicOrderByName();

            // Transform categories to include music count
            List<Map<String, Object>> categoryDTOs = categories.stream().map(category -> {
                Map<String, Object> categoryDTO = new HashMap<>();
                categoryDTO.put("id", category.getId());
                categoryDTO.put("name", category.getName());
                categoryDTO.put("description", category.getDescription());
                categoryDTO.put("imageUrl", category.getImageUrl());
                categoryDTO.put("isActive", category.getIsActive());
                categoryDTO.put("createdAt", category.getCreatedAt());
                categoryDTO.put("updatedAt", category.getUpdatedAt());
                categoryDTO.put("musicCount", category.getMusicList() != null ? category.getMusicList().size() : 0);
                return categoryDTO;
            }).toList();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Categories loaded successfully");
            response.put("data", categoryDTOs);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "An unexpected error occurred. Please try again later.");

            return ResponseEntity.status(500).body(response);
        }
    }

    public ResponseEntity<Map<String, Object>> getCategoryById(Long id) {
        try {
            Optional<Category> categoryOpt = categoryRepository.findById(id);

            if (categoryOpt.isEmpty() || !categoryOpt.get().getIsActive()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Category not found");

                return ResponseEntity.status(404).body(response);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Category loaded successfully");
            response.put("data", categoryOpt.get());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "An unexpected error occurred. Please try again later.");

            return ResponseEntity.status(500).body(response);
        }
    }
}
