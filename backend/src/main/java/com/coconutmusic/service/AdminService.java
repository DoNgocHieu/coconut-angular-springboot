package com.coconutmusic.service;

import com.coconutmusic.entity.Music;
import com.coconutmusic.repository.MusicRepository;
import com.coconutmusic.repository.UserRepository;
import com.coconutmusic.repository.CategoryRepository;
import com.coconutmusic.repository.PlaylistRepository;
import com.coconutmusic.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private ArtistRepository artistRepository;

    /**
     * Get dashboard statistics
     */
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // Count statistics
        stats.put("totalMusic", musicRepository.count());
        stats.put("totalUsers", userRepository.count());
        stats.put("totalCategories", categoryRepository.count());
        stats.put("totalPlaylists", playlistRepository.count());
        stats.put("totalArtists", artistRepository.count());

        // Active content
        stats.put("activeMusic", musicRepository.countByIsActiveTrue());
        stats.put("verifiedUsers", userRepository.countByIsVerifiedTrue());
        stats.put("adminUsers", userRepository.countByIsAdminTrue());

        // Recent additions (last 7 days)
        LocalDateTime weekAgo = LocalDateTime.now().minusDays(7);
        stats.put("newMusicThisWeek", musicRepository.countByCreatedAtAfter(weekAgo));
        stats.put("newUsersThisWeek", userRepository.countByCreatedAtAfter(weekAgo));

        return stats;
    }

    /**
     * Get music statistics by category
     */
    public Map<String, Object> getMusicStatsByCategory() {
        Map<String, Object> result = new HashMap<>();

        List<Object[]> categoryStats = musicRepository.findMusicCountByCategory();

        List<Map<String, Object>> data = categoryStats.stream()
            .map(row -> {
                Map<String, Object> item = new HashMap<>();
                item.put("categoryName", row[0] != null ? row[0].toString() : "Uncategorized");
                item.put("musicCount", ((Number) row[1]).longValue());
                return item;
            })
            .collect(Collectors.toList());

        result.put("categories", data);
        return result;
    }

    /**
     * Get top played music
     */
    public List<Music> getTopPlayedMusic(int limit) {
        PageRequest pageRequest = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "playCount"));
        return musicRepository.findByIsActiveTrueOrderByPlayCountDesc(pageRequest).getContent();
    }

    /**
     * Get user registration trends (last 30 days)
     */
    public Map<String, Object> getUserRegistrationTrends() {
        Map<String, Object> result = new HashMap<>();

        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        List<Object[]> dailyRegistrations = userRepository.findDailyRegistrations(thirtyDaysAgo);

        List<Map<String, Object>> trends = dailyRegistrations.stream()
            .map(row -> {
                Map<String, Object> item = new HashMap<>();
                item.put("date", row[0].toString());
                item.put("count", ((Number) row[1]).longValue());
                return item;
            })
            .collect(Collectors.toList());

        result.put("dailyRegistrations", trends);
        result.put("totalNewUsers", userRepository.countByCreatedAtAfter(thirtyDaysAgo));

        return result;
    }

    /**
     * Get system health status
     */
    public Map<String, Object> getSystemHealth() {
        Map<String, Object> health = new HashMap<>();

        try {
            // Test database connectivity
            long totalMusic = musicRepository.count();
            health.put("database", "UP");
            health.put("databaseRecords", totalMusic);
        } catch (Exception e) {
            health.put("database", "DOWN");
            health.put("databaseError", e.getMessage());
        }

        // Memory usage
        Runtime runtime = Runtime.getRuntime();
        long maxMemory = runtime.maxMemory();
        long totalMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();
        long usedMemory = totalMemory - freeMemory;

        Map<String, Object> memoryInfo = new HashMap<>();
        memoryInfo.put("max", maxMemory / (1024 * 1024) + " MB");
        memoryInfo.put("total", totalMemory / (1024 * 1024) + " MB");
        memoryInfo.put("used", usedMemory / (1024 * 1024) + " MB");
        memoryInfo.put("free", freeMemory / (1024 * 1024) + " MB");
        memoryInfo.put("usagePercentage", Math.round((double) usedMemory / maxMemory * 100));

        health.put("memory", memoryInfo);
        health.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        health.put("status", "UP");

        return health;
    }
}
