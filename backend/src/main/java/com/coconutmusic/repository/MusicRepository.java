package com.coconutmusic.repository;

import com.coconutmusic.entity.Music;
import com.coconutmusic.entity.MusicType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MusicRepository extends JpaRepository<Music, Long> {

    Page<Music> findByIsActiveTrue(Pageable pageable);

    Page<Music> findByTypeMusicAndIsActiveTrue(MusicType typeMusic, Pageable pageable);

    Page<Music> findByCategoryIdAndIsActiveTrue(Long categoryId, Pageable pageable);

    Page<Music> findByArtistIdAndIsActiveTrue(Long artistId, Pageable pageable);

    Optional<Music> findByIdAndIsActiveTrue(Long id);

    Page<Music> findByTitleContainingIgnoreCaseAndIsActiveTrue(String title, Pageable pageable);

    @Query("SELECT m FROM Music m WHERE m.isActive = true AND " +
           "(LOWER(m.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(m.artist.name) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Music> searchByTitleOrArtist(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT m FROM Music m WHERE m.isActive = true ORDER BY m.playCount DESC")
    Page<Music> findMostPlayed(Pageable pageable);

    @Query("SELECT m FROM Music m WHERE m.isActive = true ORDER BY m.createdAt DESC")
    Page<Music> findNewest(Pageable pageable);

    @Query("SELECT m FROM Music m WHERE m.isActive = true ORDER BY m.likeCount DESC")
    Page<Music> findMostLiked(Pageable pageable);

    @Modifying
    @Query("UPDATE Music m SET m.playCount = m.playCount + 1 WHERE m.id = :musicId")
    void incrementPlayCount(@Param("musicId") Long musicId);

    @Modifying
    @Query("UPDATE Music m SET m.likeCount = m.likeCount + 1 WHERE m.id = :musicId")
    void incrementLikeCount(@Param("musicId") Long musicId);

    @Modifying
    @Query("UPDATE Music m SET m.likeCount = m.likeCount - 1 WHERE m.id = :musicId AND m.likeCount > 0")
    void decrementLikeCount(@Param("musicId") Long musicId);

    @Query("SELECT COUNT(m) FROM Music m WHERE m.isActive = true")
    Long countActiveMusic();

    @Query("SELECT m FROM Music m WHERE m.uploadedBy.id = :userId")
    Page<Music> findByUploadedBy(@Param("userId") Long userId, Pageable pageable);

    List<Music> findTop10ByIsActiveTrueOrderByPlayCountDesc();

    List<Music> findTop10ByIsActiveTrueOrderByCreatedAtDesc();
}
