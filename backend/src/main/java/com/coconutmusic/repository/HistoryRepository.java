package com.coconutmusic.repository;

import com.coconutmusic.entity.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

    Page<History> findByUserIdOrderByPlayedAtDesc(Long userId, Pageable pageable);

    List<History> findByUserIdOrderByPlayedAtDesc(Long userId);

    List<History> findByMusicId(Long musicId);

    @Query("SELECT h FROM History h WHERE h.user.id = :userId AND h.playedAt >= :since ORDER BY h.playedAt DESC")
    List<History> findByUserIdAndPlayedAtAfter(@Param("userId") Long userId, @Param("since") LocalDateTime since);

    @Query("SELECT COUNT(h) FROM History h WHERE h.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(h) FROM History h WHERE h.music.id = :musicId")
    Long countByMusicId(@Param("musicId") Long musicId);

    @Query("SELECT h.music, COUNT(h) as playCount FROM History h " +
           "WHERE h.playedAt >= :since GROUP BY h.music ORDER BY playCount DESC")
    List<Object[]> findMostPlayedMusicSince(@Param("since") LocalDateTime since, Pageable pageable);

    @Query("SELECT h FROM History h WHERE h.user.id = :userId " +
           "GROUP BY h.music ORDER BY MAX(h.playedAt) DESC")
    List<History> findDistinctByUserIdOrderByPlayedAtDesc(@Param("userId") Long userId, Pageable pageable);
}
