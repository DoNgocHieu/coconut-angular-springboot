package com.coconutmusic.repository;

import com.coconutmusic.entity.FavoritePlaylist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoritePlaylistRepository extends JpaRepository<FavoritePlaylist, Long> {

    // Check if user has favorited a playlist - Fix with proper entity relations
    @Query("SELECT CASE WHEN COUNT(fp) > 0 THEN true ELSE false END FROM FavoritePlaylist fp WHERE fp.user.id = :userId AND fp.playlist.id = :playlistId")
    boolean existsByUserIdAndPlaylistId(@Param("userId") Long userId, @Param("playlistId") Long playlistId);

    // Get favorite playlist by user and playlist - Fix with proper entity relations
    @Query("SELECT fp FROM FavoritePlaylist fp WHERE fp.user.id = :userId AND fp.playlist.id = :playlistId")
    Optional<FavoritePlaylist> findByUserIdAndPlaylistId(@Param("userId") Long userId, @Param("playlistId") Long playlistId);

    // Get user's favorite playlists
    @Query("SELECT fp FROM FavoritePlaylist fp " +
           "JOIN FETCH fp.playlist p " +
           "WHERE fp.user.id = :userId " +
           "ORDER BY fp.createdAt DESC")
    Page<FavoritePlaylist> findByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId, Pageable pageable);    // Delete favorite playlist - Fix with proper entity relations
    @Query("DELETE FROM FavoritePlaylist fp WHERE fp.user.id = :userId AND fp.playlist.id = :playlistId")
    @Modifying
    void deleteByUserIdAndPlaylistId(@Param("userId") Long userId, @Param("playlistId") Long playlistId);

    // Count favorite playlists by user - Fix with proper entity relations
    @Query("SELECT COUNT(fp) FROM FavoritePlaylist fp WHERE fp.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
}
