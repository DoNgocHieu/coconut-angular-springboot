package com.coconutmusic.service;

import com.coconutmusic.dto.request.CategoryCreateRequest;
import com.coconutmusic.dto.request.CategoryUpdateRequest;
import com.coconutmusic.entity.Category;
import com.coconutmusic.exception.BadRequestException;
import com.coconutmusic.exception.ResourceNotFoundException;
import com.coconutmusic.repository.CategoryRepository;
import com.coconutmusic.repository.MusicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class AdminCategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private MusicRepository musicRepository;

    /**
     * Get all categories with filtering and pagination
     */
    public Page<Category> getAllCategories(Pageable pageable, String search, Boolean isActive) {
        Specification<Category> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Search by name
            if (search != null && !search.trim().isEmpty()) {
                String searchPattern = "%" + search.toLowerCase() + "%";
                Predicate namePredicate = criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("name")), searchPattern);
                predicates.add(namePredicate);
            }

            // Filter by active status
            if (isActive != null) {
                predicates.add(criteriaBuilder.equal(root.get("isActive"), isActive));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        return categoryRepository.findAll(spec, pageable);
    }

    /**
     * Get category by ID
     */
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
    }

    /**
     * Create new category
     */
    public Category createCategory(CategoryCreateRequest request) {
        // Check if category name already exists
        if (categoryRepository.existsByName(request.getName())) {
            throw new BadRequestException("Category name already exists: " + request.getName());
        }

        Category category = new Category();
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setImageUrl(request.getImageUrl());
        category.setIsActive(request.getIsActive());

        return categoryRepository.save(category);
    }

    /**
     * Update category
     */
    public Category updateCategory(Long id, CategoryUpdateRequest request) {
        Category category = getCategoryById(id);

        // Check if new name already exists (excluding current category)
        if (!category.getName().equals(request.getName()) &&
            categoryRepository.existsByName(request.getName())) {
            throw new BadRequestException("Category name already exists: " + request.getName());
        }

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setImageUrl(request.getImageUrl());
        category.setIsActive(request.getIsActive());

        return categoryRepository.save(category);
    }

    /**
     * Delete category
     */
    public void deleteCategory(Long id) {
        Category category = getCategoryById(id);

        // Check if category has music
        long musicCount = musicRepository.countByCategoryId(id);
        if (musicCount > 0) {
            throw new BadRequestException("Cannot delete category with " + musicCount + " music items. Please reassign or delete the music first.");
        }

        categoryRepository.delete(category);
    }

    /**
     * Toggle active status
     */
    public Category toggleActiveStatus(Long id) {
        Category category = getCategoryById(id);
        category.setIsActive(!category.getIsActive());
        return categoryRepository.save(category);
    }

    /**
     * Get category statistics
     */
    public Map<String, Object> getCategoryStats(Long id) {
        Category category = getCategoryById(id);

        Map<String, Object> stats = new HashMap<>();
        stats.put("category", category);
        stats.put("totalMusic", musicRepository.countByCategoryId(id));
        stats.put("activeMusic", musicRepository.countByCategoryIdAndIsActiveTrue(id));

        return stats;
    }
}
