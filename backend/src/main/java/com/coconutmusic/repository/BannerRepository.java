package com.coconutmusic.repository;

import com.coconutmusic.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {

    List<Banner> findByIsActiveTrueOrderBySortOrderAsc();

    List<Banner> findAllByOrderBySortOrderAsc();

    @Query("SELECT COUNT(b) FROM Banner b WHERE b.isActive = true")
    Long countActiveBanners();
}
