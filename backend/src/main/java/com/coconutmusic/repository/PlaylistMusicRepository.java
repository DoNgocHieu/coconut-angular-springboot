package com.coconutmusic.repository;

import com.coconutmusic.entity.PlaylistMusic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlaylistMusicRepository extends JpaRepository<PlaylistMusic, Long> {

    List<PlaylistMusic> findByPlaylistIdOrderByPositionAsc(Long playlistId);

    List<PlaylistMusic> findByMusicId(Long musicId);

    Optional<PlaylistMusic> findByPlaylistIdAndMusicId(Long playlistId, Long musicId);

    Boolean existsByPlaylistIdAndMusicId(Long playlistId, Long musicId);

    @Query("SELECT COUNT(pm) FROM PlaylistMusic pm WHERE pm.playlist.id = :playlistId")
    Long countByPlaylistId(@Param("playlistId") Long playlistId);

    @Query("SELECT MAX(pm.position) FROM PlaylistMusic pm WHERE pm.playlist.id = :playlistId")
    Integer findMaxPositionByPlaylistId(@Param("playlistId") Long playlistId);

    void deleteByPlaylistIdAndMusicId(Long playlistId, Long musicId);
}
