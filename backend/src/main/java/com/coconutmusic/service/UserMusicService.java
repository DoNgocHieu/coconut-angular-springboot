package com.coconutmusic.service;

import com.coconutmusic.entity.*;
import com.coconutmusic.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserMusicService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private FavoritePlaylistRepository favoritePlaylistRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private UserRepository userRepository;

    private static final int MAX_RECENT_HISTORY = 10;

    // ==================== FAVORITE MUSIC ====================

    public boolean addToFavorites(Long userId, Long musicId) {
        if (favoriteRepository.existsByUserIdAndMusicId(userId, musicId)) {
            return false; // Already favorited
        }

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Music music = musicRepository.findById(musicId)
            .orElseThrow(() -> new RuntimeException("Music not found"));

        Favorite favorite = new Favorite(user, music);
        favoriteRepository.save(favorite);
        return true;
    }

    public boolean removeFromFavorites(Long userId, Long musicId) {
        if (!favoriteRepository.existsByUserIdAndMusicId(userId, musicId)) {
            return false; // Not favorited
        }

        favoriteRepository.deleteByUserIdAndMusicId(userId, musicId);
        return true;
    }

    public boolean isFavoriteMusic(Long userId, Long musicId) {
        return favoriteRepository.existsByUserIdAndMusicId(userId, musicId);
    }    public Page<Favorite> getUserFavoriteMusic(Long userId, Pageable pageable) {
        return favoriteRepository.findByUserIdWithMusicOrderByCreatedAtDesc(userId, pageable);
    }

    // ==================== FAVORITE PLAYLISTS ====================

    public boolean addPlaylistToFavorites(Long userId, Long playlistId) {
        if (favoritePlaylistRepository.existsByUserIdAndPlaylistId(userId, playlistId)) {
            return false; // Already favorited
        }

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Playlist playlist = playlistRepository.findById(playlistId)
            .orElseThrow(() -> new RuntimeException("Playlist not found"));

        FavoritePlaylist favoritePlaylist = new FavoritePlaylist(user, playlist);
        favoritePlaylistRepository.save(favoritePlaylist);
        return true;
    }

    public boolean removePlaylistFromFavorites(Long userId, Long playlistId) {
        if (!favoritePlaylistRepository.existsByUserIdAndPlaylistId(userId, playlistId)) {
            return false; // Not favorited
        }

        favoritePlaylistRepository.deleteByUserIdAndPlaylistId(userId, playlistId);
        return true;
    }

    public boolean isFavoritePlaylist(Long userId, Long playlistId) {
        return favoritePlaylistRepository.existsByUserIdAndPlaylistId(userId, playlistId);
    }

    public Page<FavoritePlaylist> getUserFavoritePlaylists(Long userId, Pageable pageable) {
        return favoritePlaylistRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
    }

    // ==================== RECENTLY PLAYED ====================

    public void addToRecentlyPlayed(Long userId, Long musicId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Music music = musicRepository.findById(musicId)
            .orElseThrow(() -> new RuntimeException("Music not found"));

        // Check if this music is already in user's recent history
        List<History> existingHistory = historyRepository.findByUserIdAndMusicId(userId, musicId);

        // Remove existing entries for this music (to avoid duplicates)
        if (!existingHistory.isEmpty()) {
            historyRepository.deleteAll(existingHistory);
        }

        // Add new history entry
        History history = new History(user, music);
        historyRepository.save(history);

        // Keep only the latest 10 entries
        maintainRecentHistoryLimit(userId);

        // Update play count
        incrementPlayCount(musicId);
    }

    private void maintainRecentHistoryLimit(Long userId) {
        List<History> userHistory = historyRepository.findByUserIdOrderByPlayedAtDesc(userId);

        if (userHistory.size() > MAX_RECENT_HISTORY) {
            // Keep only the most recent MAX_RECENT_HISTORY entries
            List<History> toDelete = userHistory.subList(MAX_RECENT_HISTORY, userHistory.size());
            historyRepository.deleteAll(toDelete);
        }
    }

    public Page<History> getUserRecentlyPlayed(Long userId, Pageable pageable) {
        return historyRepository.findByUserIdOrderByPlayedAtDesc(userId, pageable);
    }

    public List<History> getUserRecentlyPlayedList(Long userId) {
        Pageable pageable = PageRequest.of(0, MAX_RECENT_HISTORY);
        return historyRepository.findByUserIdOrderByPlayedAtDesc(userId, pageable).getContent();
    }

    // ==================== PLAY COUNT ====================

    public void incrementPlayCount(Long musicId) {
        Music music = musicRepository.findById(musicId)
            .orElseThrow(() -> new RuntimeException("Music not found"));

        music.setPlayCount(music.getPlayCount() + 1);
        musicRepository.save(music);
    }

    public void incrementPlayCountBatch(List<Long> musicIds) {
        for (Long musicId : musicIds) {
            incrementPlayCount(musicId);
        }
    }

    // ==================== COMBINED ACTIONS ====================

    /**
     * Called when user plays a music - handles both history and play count
     */
    public void playMusic(Long userId, Long musicId) {
        addToRecentlyPlayed(userId, musicId);
        // Note: incrementPlayCount is already called in addToRecentlyPlayed
    }

    /**
     * Called when user plays multiple music (auto-play next)
     */
    public void playMusicBatch(Long userId, List<Long> musicIds) {
        for (Long musicId : musicIds) {
            addToRecentlyPlayed(userId, musicId);
        }
    }

    // ==================== STATS ====================

    public Long getUserFavoriteMusicCount(Long userId) {
        return favoriteRepository.countByUserId(userId);
    }

    public Long getUserFavoritePlaylistCount(Long userId) {
        return favoritePlaylistRepository.countByUserId(userId);
    }

    public Long getUserRecentlyPlayedCount(Long userId) {
        return historyRepository.countByUserId(userId);
    }
}
