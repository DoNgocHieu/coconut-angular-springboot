package com.coconutmusic.controller;

import com.coconutmusic.dto.response.ApiResponse;
import com.coconutmusic.entity.Favorite;
import com.coconutmusic.entity.FavoritePlaylist;
import com.coconutmusic.entity.History;
import com.coconutmusic.security.UserPrincipal;
import com.coconutmusic.service.UserMusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserMusicController {

    @Autowired
    private UserMusicService userMusicService;

    // ==================== FAVORITE MUSIC ====================
    @PostMapping("/favorites")
    public ResponseEntity<ApiResponse> addToFavorites(
            @RequestBody Map<String, Object> request,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        try {
            Long musicId = Long.valueOf(request.get("musicId").toString());
            // Use default user ID if not authenticated
            Long userId = (currentUser != null) ? currentUser.getId() : 1L;

            boolean added = userMusicService.addToFavorites(userId, musicId);
            if (added) {
                return ResponseEntity.ok(ApiResponse.success("Music added to favorites", null));
            } else {
                return ResponseEntity.ok(ApiResponse.success("Music already in favorites", null));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error adding to favorites: " + e.getMessage()));
        }
    }
    @DeleteMapping("/favorites/{musicId}")
    public ResponseEntity<ApiResponse> removeFromFavorites(
            @PathVariable Long musicId,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        try {
            // Use default user ID if not authenticated
            Long userId = (currentUser != null) ? currentUser.getId() : 1L;

            boolean removed = userMusicService.removeFromFavorites(userId, musicId);
            if (removed) {
                return ResponseEntity.ok(ApiResponse.success("Music removed from favorites", null));
            } else {
                return ResponseEntity.ok(ApiResponse.success("Music was not in favorites", null));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error removing from favorites: " + e.getMessage()));
        }
    }    @GetMapping("/favorites/check/{musicId}")
    public ResponseEntity<ApiResponse> checkFavoriteMusic(
            @PathVariable Long musicId,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        try {
            // Use default user ID if not authenticated
            Long userId = (currentUser != null) ? currentUser.getId() : 1L;

            boolean isFavorite = userMusicService.isFavoriteMusic(userId, musicId);
            return ResponseEntity.ok(ApiResponse.success("Favorite status checked", isFavorite));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error checking favorite status: " + e.getMessage()));
        }
    }    @GetMapping("/favorites")
    public ResponseEntity<ApiResponse> getFavoriteMusic(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        try {
            // Use default user ID if not authenticated
            Long userId = (currentUser != null) ? currentUser.getId() : 1L;

            Pageable pageable = PageRequest.of(page, size);
            Page<Favorite> favorites = userMusicService.getUserFavoriteMusic(userId, pageable);
            return ResponseEntity.ok(ApiResponse.success("Favorite music retrieved", favorites));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error getting favorite music: " + e.getMessage()));
        }
    }

    // ==================== FAVORITE PLAYLISTS ====================    @PostMapping("/favorite-playlists")
    public ResponseEntity<ApiResponse> addPlaylistToFavorites(
            @RequestBody Map<String, Object> request,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        try {
            Long playlistId = Long.valueOf(request.get("playlistId").toString());
            // Use default user ID if not authenticated
            Long userId = (currentUser != null) ? currentUser.getId() : 1L;

            boolean added = userMusicService.addPlaylistToFavorites(userId, playlistId);
            if (added) {
                return ResponseEntity.ok(ApiResponse.success("Playlist added to favorites", null));
            } else {
                return ResponseEntity.ok(ApiResponse.success("Playlist already in favorites", null));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error adding playlist to favorites: " + e.getMessage()));
        }
    }    @DeleteMapping("/favorite-playlists/{playlistId}")
    public ResponseEntity<ApiResponse> removePlaylistFromFavorites(
            @PathVariable Long playlistId,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        try {
            // Use default user ID if not authenticated
            Long userId = (currentUser != null) ? currentUser.getId() : 1L;

            boolean removed = userMusicService.removePlaylistFromFavorites(userId, playlistId);
            if (removed) {
                return ResponseEntity.ok(ApiResponse.success("Playlist removed from favorites", null));
            } else {
                return ResponseEntity.ok(ApiResponse.success("Playlist was not in favorites", null));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error removing playlist from favorites: " + e.getMessage()));
        }
    }    @GetMapping("/favorite-playlists/check/{playlistId}")
    public ResponseEntity<ApiResponse> checkFavoritePlaylist(
            @PathVariable Long playlistId,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        try {
            // Use default user ID if not authenticated
            Long userId = (currentUser != null) ? currentUser.getId() : 1L;

            boolean isFavorite = userMusicService.isFavoritePlaylist(userId, playlistId);
            return ResponseEntity.ok(ApiResponse.success("Favorite status checked", isFavorite));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error checking favorite status: " + e.getMessage()));
        }
    }    @GetMapping("/favorite-playlists")
    public ResponseEntity<ApiResponse> getFavoritePlaylists(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        try {
            // Use default user ID if not authenticated
            Long userId = (currentUser != null) ? currentUser.getId() : 1L;

            Pageable pageable = PageRequest.of(page, size);
            Page<FavoritePlaylist> favoritePlaylists = userMusicService.getUserFavoritePlaylists(userId, pageable);
            return ResponseEntity.ok(ApiResponse.success("Favorite playlists retrieved", favoritePlaylists));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error getting favorite playlists: " + e.getMessage()));
        }
    }

    // ==================== RECENTLY PLAYED ====================

    @PostMapping("/recently-played/{musicId}")
    public ResponseEntity<ApiResponse> addToRecentlyPlayed(
            @PathVariable Long musicId,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        try {
            userMusicService.addToRecentlyPlayed(currentUser.getId(), musicId);
            return ResponseEntity.ok(ApiResponse.success("Music added to recently played", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error adding to recently played: " + e.getMessage()));
        }
    }

    @GetMapping("/recently-played")
    public ResponseEntity<ApiResponse> getRecentlyPlayed(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<History> recentlyPlayed = userMusicService.getUserRecentlyPlayed(currentUser.getId(), pageable);
            return ResponseEntity.ok(ApiResponse.success("Recently played music retrieved", recentlyPlayed));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error getting recently played music: " + e.getMessage()));
        }
    }

    // ==================== PLAY MUSIC (Combined Action) ====================

    @PostMapping("/play/{musicId}")
    public ResponseEntity<ApiResponse> playMusic(
            @PathVariable Long musicId,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        try {
            userMusicService.playMusic(currentUser.getId(), musicId);
            return ResponseEntity.ok(ApiResponse.success("Music played", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error playing music: " + e.getMessage()));
        }
    }

    @PostMapping("/play-batch")
    public ResponseEntity<ApiResponse> playMusicBatch(
            @RequestBody Map<String, List<Long>> request,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        try {
            List<Long> musicIds = request.get("musicIds");
            if (musicIds == null || musicIds.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Music IDs are required"));
            }

            userMusicService.playMusicBatch(currentUser.getId(), musicIds);
            return ResponseEntity.ok(ApiResponse.success("Music batch played", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error playing music batch: " + e.getMessage()));
        }
    }

    // ==================== STATS ====================

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse> getUserStats(
            @AuthenticationPrincipal UserPrincipal currentUser) {

        try {
            Long favoriteMusicCount = userMusicService.getUserFavoriteMusicCount(currentUser.getId());
            Long favoritePlaylistCount = userMusicService.getUserFavoritePlaylistCount(currentUser.getId());
            Long recentlyPlayedCount = userMusicService.getUserRecentlyPlayedCount(currentUser.getId());

            Map<String, Object> stats = Map.of(
                "favoriteMusicCount", favoriteMusicCount,
                "favoritePlaylistCount", favoritePlaylistCount,
                "recentlyPlayedCount", recentlyPlayedCount
            );

            return ResponseEntity.ok(ApiResponse.success("User stats retrieved", stats));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error getting user stats: " + e.getMessage()));
        }
    }
}
