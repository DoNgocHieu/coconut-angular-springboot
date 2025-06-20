package com.coconutmusic.repository;

import com.coconutmusic.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByIsActiveTrueOrderByName();

    Optional<Category> findByNameAndIsActiveTrue(String name);

    Boolean existsByName(String name);

    @Query("SELECT COUNT(c) FROM Category c WHERE c.isActive = true")
    Long countActiveCategories();

    @Query("SELECT c FROM Category c JOIN c.musicList m WHERE c.isActive = true GROUP BY c ORDER BY COUNT(m) DESC")
    List<Category> findCategoriesOrderByMusicCount();
}
