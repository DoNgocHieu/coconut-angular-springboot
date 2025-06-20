package com.coconutmusic.repository;

import com.coconutmusic.entity.Favorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    Page<Favorite> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    @Query("SELECT f FROM Favorite f JOIN FETCH f.music WHERE f.user.id = :userId ORDER BY f.createdAt DESC")
    Page<Favorite> findByUserIdWithMusicOrderByCreatedAtDesc(@Param("userId") Long userId, Pageable pageable);

    List<Favorite> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<Favorite> findByMusicId(Long musicId);

    Optional<Favorite> findByUserIdAndMusicId(Long userId, Long musicId);

    Boolean existsByUserIdAndMusicId(Long userId, Long musicId);

    @Query("SELECT COUNT(f) FROM Favorite f WHERE f.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(f) FROM Favorite f WHERE f.music.id = :musicId")
    Long countByMusicId(@Param("musicId") Long musicId);

    void deleteByUserIdAndMusicId(Long userId, Long musicId);
}
