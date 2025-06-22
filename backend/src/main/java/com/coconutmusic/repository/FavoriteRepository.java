package com.coconutmusic.repository;

import com.coconutmusic.entity.Favorite;
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
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    @Query("SELECT f FROM Favorite f WHERE f.user.id = :userId ORDER BY f.createdAt DESC")
    Page<Favorite> findByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId, Pageable pageable);    @Query("SELECT f FROM Favorite f JOIN FETCH f.music m JOIN FETCH m.artist JOIN FETCH m.category WHERE f.user.id = :userId ORDER BY f.createdAt DESC")
    Page<Favorite> findByUserIdWithMusicOrderByCreatedAtDesc(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT f FROM Favorite f WHERE f.user.id = :userId ORDER BY f.createdAt DESC")
    List<Favorite> findByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);

    // Fix: Use proper entity relations instead of primitive IDs
    @Query("SELECT f FROM Favorite f WHERE f.music.id = :musicId")
    List<Favorite> findByMusicId(@Param("musicId") Long musicId);

    @Query("SELECT f FROM Favorite f WHERE f.user.id = :userId AND f.music.id = :musicId")
    Optional<Favorite> findByUserIdAndMusicId(@Param("userId") Long userId, @Param("musicId") Long musicId);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM Favorite f WHERE f.user.id = :userId AND f.music.id = :musicId")
    Boolean existsByUserIdAndMusicId(@Param("userId") Long userId, @Param("musicId") Long musicId);

    @Query("SELECT COUNT(f) FROM Favorite f WHERE f.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);    @Query("SELECT COUNT(f) FROM Favorite f WHERE f.music.id = :musicId")
    Long countByMusicId(@Param("musicId") Long musicId);

    @Query("DELETE FROM Favorite f WHERE f.user.id = :userId AND f.music.id = :musicId")
    @Modifying
    void deleteByUserIdAndMusicId(@Param("userId") Long userId, @Param("musicId") Long musicId);
}
