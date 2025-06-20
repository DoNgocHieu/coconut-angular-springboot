package com.coconutmusic.repository;

import com.coconutmusic.entity.Playlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    List<Playlist> findByUserIdOrderByUpdatedAtDesc(Long userId);

    Page<Playlist> findByUserIdOrderByUpdatedAtDesc(Long userId, Pageable pageable);

    Page<Playlist> findByIsPublicTrueOrderByUpdatedAtDesc(Pageable pageable);

    @Query("SELECT p FROM Playlist p WHERE p.isPublic = true AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Playlist> searchPublicPlaylists(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT COUNT(p) FROM Playlist p WHERE p.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);

    Boolean existsByUserIdAndName(Long userId, String name);
}
