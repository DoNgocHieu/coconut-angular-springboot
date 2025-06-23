package com.coconutmusic.controller;

import com.coconutmusic.dto.response.ApiResponse;
import com.coconutmusic.repository.FavoritePlaylistRepository;
import com.coconutmusic.repository.FavoriteRepository;
import com.coconutmusic.repository.UserRepository;
import com.coconutmusic.repository.PlaylistRepository;
import com.coconutmusic.repository.MusicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user-admin")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private FavoritePlaylistRepository favoritePlaylistRepository;

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private MusicRepository musicRepository;    // ===== SIMPLE FAVORITES ENDPOINTS (NO AUTH) =====

    @PostMapping("/simple-favorites")
    public ResponseEntity<ApiResponse> addToFavoritesSimple(@RequestBody Map<String, Long> request) {
        try {
            Long musicId = request.get("musicId");
            if (musicId == null) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Music ID is required"));
            }
            Long userId = 1L;

            var existingFavorite = favoriteRepository.findByUserIdAndMusicId(userId, musicId);
            if (existingFavorite.isPresent()) {
                return ResponseEntity.ok(ApiResponse.success("Music already in favorites", false));
            }

            var user = userRepository.findById(userId);
            var music = musicRepository.findById(musicId);

            if (user.isEmpty() || music.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("User or Music not found"));
            }

            var favorite = new com.coconutmusic.entity.Favorite();
            favorite.setUser(user.get());
            favorite.setMusic(music.get());
            favorite.setCreatedAt(java.time.LocalDateTime.now());

            favoriteRepository.save(favorite);

            // Tăng like count
            music.get().setLikeCount(music.get().getLikeCount() + 1);
            musicRepository.save(music.get());

            var responseData = java.util.Map.of(
                "id", favorite.getId(),
                "music", music.get(),
                "addedAt", favorite.getCreatedAt().toString(),
                "userId", userId
            );

            return ResponseEntity.ok(ApiResponse.success("Music added to favorites", responseData));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error adding to favorites: " + e.getMessage()));
        }
    }    @DeleteMapping("/simple-favorites/{musicId}")
    public ResponseEntity<ApiResponse> removeFromFavoritesSimple(@PathVariable Long musicId) {
        try {
            Long userId = 1L;
            var favorite = favoriteRepository.findByUserIdAndMusicId(userId, musicId);
            if (favorite.isPresent()) {
                favoriteRepository.delete(favorite.get());

                // Giảm like count
                var music = musicRepository.findById(musicId);
                if (music.isPresent() && music.get().getLikeCount() > 0) {
                    music.get().setLikeCount(music.get().getLikeCount() - 1);
                    musicRepository.save(music.get());
                }

                return ResponseEntity.ok(ApiResponse.success("Music removed from favorites", true));
            } else {
                return ResponseEntity.ok(ApiResponse.success("Music was not in favorites", false));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error removing from favorites: " + e.getMessage()));
        }
    }    @GetMapping("/simple-favorites/check/{musicId}")
    public ResponseEntity<ApiResponse> checkFavoriteMusicStatusSimple(@PathVariable Long musicId) {
        try {
            // For now, use a default user ID (1) until proper authentication is implemented
            Long userId = 1L;

            var favorite = favoriteRepository.findByUserIdAndMusicId(userId, musicId);
            boolean isFavorite = favorite.isPresent();
            return ResponseEntity.ok(ApiResponse.success("Favorite status checked", isFavorite));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error checking favorite status: " + e.getMessage()));
        }
    }    @GetMapping("/simple-favorites")
    public ResponseEntity<ApiResponse> getFavoritesSimple(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            // For now, use a default user ID (1) until proper authentication is implemented
            Long userId = 1L;

            var pageable = org.springframework.data.domain.PageRequest.of(page, size);
            var favorites = favoriteRepository.findByUserIdWithMusicOrderByCreatedAtDesc(userId, pageable);

            // Transform to frontend expected format
            var content = favorites.getContent().stream().map(f -> {
                return java.util.Map.of(
                    "id", f.getId(),
                    "music", f.getMusic(),
                    "addedAt", f.getCreatedAt().toString(),
                    "userId", f.getUserId()
                );
            }).toList();

            var result = java.util.Map.of(
                "content", content,
                "totalElements", favorites.getTotalElements(),
                "totalPages", favorites.getTotalPages(),
                "number", favorites.getNumber(),
                "size", favorites.getSize(),
                "first", favorites.isFirst(),
                "last", favorites.isLast(),
                "numberOfElements", favorites.getNumberOfElements(),
                "empty", favorites.isEmpty()
            );

            return ResponseEntity.ok(ApiResponse.success("Favorites retrieved", result));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error getting favorites: " + e.getMessage()));
        }
    }

    // ===== FAVORITE PLAYLISTS ENDPOINTS =====

    @PostMapping("/simple-favorite-playlists")
    public ResponseEntity<ApiResponse> addToFavoritePlaylistsSimple(@RequestBody Map<String, Long> request) {
        try {
            Long playlistId = request.get("playlistId");
            if (playlistId == null) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Playlist ID is required"));
            }

            // For now, use a default user ID (1) until proper authentication is implemented
            Long userId = 1L;

            // Check if already exists
            var existingFavorite = favoritePlaylistRepository.findByUserIdAndPlaylistId(userId, playlistId);
            if (existingFavorite.isPresent()) {
                return ResponseEntity.ok(ApiResponse.success("Playlist already in favorites", false));
            }

            // Get user and playlist entities
            var user = userRepository.findById(userId);
            var playlist = playlistRepository.findById(playlistId);

            if (user.isEmpty() || playlist.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("User or Playlist not found"));
            }

            var favoritePlaylist = new com.coconutmusic.entity.FavoritePlaylist();
            favoritePlaylist.setUser(user.get());
            favoritePlaylist.setPlaylist(playlist.get());
            favoritePlaylist.setCreatedAt(java.time.LocalDateTime.now());

            favoritePlaylistRepository.save(favoritePlaylist);

            // Create response data
            var responseData = java.util.Map.of(
                "id", favoritePlaylist.getId(),
                "playlist", playlist.get(),
                "addedAt", favoritePlaylist.getCreatedAt().toString(),
                "userId", userId
            );

            return ResponseEntity.ok(ApiResponse.success("Playlist added to favorites", responseData));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error adding playlist to favorites: " + e.getMessage()));
        }
    }    @DeleteMapping("/simple-favorite-playlists/{playlistId}")
    public ResponseEntity<ApiResponse> removeFromFavoritePlaylistsSimple(@PathVariable Long playlistId) {
        try {
            // For now, use a default user ID (1) until proper authentication is implemented
            Long userId = 1L;

            var favoritePlaylist = favoritePlaylistRepository.findByUserIdAndPlaylistId(userId, playlistId);
            if (favoritePlaylist.isPresent()) {
                favoritePlaylistRepository.delete(favoritePlaylist.get());
                return ResponseEntity.ok(ApiResponse.success("Playlist removed from favorites", true));
            } else {
                return ResponseEntity.ok(ApiResponse.success("Playlist was not in favorites", false));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error removing playlist from favorites: " + e.getMessage()));
        }
    }    @GetMapping("/simple-favorite-playlists/check/{playlistId}")
    public ResponseEntity<ApiResponse> checkFavoritePlaylistStatusSimple(@PathVariable Long playlistId) {
        try {
            // For now, use a default user ID (1) until proper authentication is implemented
            Long userId = 1L;

            var favoritePlaylist = favoritePlaylistRepository.findByUserIdAndPlaylistId(userId, playlistId);
            boolean isFavorite = favoritePlaylist.isPresent();
            return ResponseEntity.ok(ApiResponse.success("Favorite playlist status checked", isFavorite));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error checking favorite playlist status: " + e.getMessage()));
        }
    }

    @GetMapping("/simple-favorite-playlists")
    public ResponseEntity<ApiResponse> getFavoritePlaylistsSimple(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            // For now, use a default user ID (1) until proper authentication is implemented
            Long userId = 1L;

            var pageable = org.springframework.data.domain.PageRequest.of(page, size);
            var favoritePlaylists = favoritePlaylistRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);

            // Transform to frontend expected format
            var content = favoritePlaylists.getContent().stream().map(fp -> {
                return java.util.Map.of(
                    "id", fp.getId(),
                    "playlist", fp.getPlaylist(),
                    "addedAt", fp.getCreatedAt().toString(),
                    "userId", fp.getUserId()
                );
            }).toList();

            var result = java.util.Map.of(
                "content", content,
                "totalElements", favoritePlaylists.getTotalElements(),
                "totalPages", favoritePlaylists.getTotalPages(),
                "number", favoritePlaylists.getNumber(),
                "size", favoritePlaylists.getSize(),
                "first", favoritePlaylists.isFirst(),
                "last", favoritePlaylists.isLast(),
                "numberOfElements", favoritePlaylists.getNumberOfElements(),
                "empty", favoritePlaylists.isEmpty()
            );

            return ResponseEntity.ok(ApiResponse.success("Favorite playlists retrieved", result));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error getting favorite playlists: " + e.getMessage()));
        }
    }

    // ===== TEST ENDPOINTS (EXISTING) =====

    @GetMapping("/test-favorite-playlists")
    public ResponseEntity<ApiResponse> testFavoritePlaylists() {
        try {
            long count = favoritePlaylistRepository.count();
            return ResponseEntity.ok(ApiResponse.success("Favorite playlists table exists. Total records: " + count, count));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error accessing favorite_playlists table: " + e.getMessage()));
        }
    }
      @GetMapping("/test-favorites-only")
    public ResponseEntity<ApiResponse> testFavoritesOnly() {
        try {
            long favoriteCount = favoriteRepository.count();
            long favoritePlaylistCount = favoritePlaylistRepository.count();

            String status = String.format(
                "Favorites Status - Favorite Songs: %d, Favorite Playlists: %d",
                favoriteCount, favoritePlaylistCount
            );

            return ResponseEntity.ok(ApiResponse.success(status, null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error checking favorites: " + e.getMessage()));
        }
    }

    @GetMapping("/test-users-info")
    public ResponseEntity<ApiResponse> testUsersInfo() {
        try {
            var users = userRepository.findAll();
            var userInfos = users.stream().map(user -> {
                return String.format("ID: %d, Username: %s, Email: %s, Verified: %s",
                    user.getId(), user.getUsername(), user.getEmail(), user.getIsVerified());
            }).toList();

            return ResponseEntity.ok(ApiResponse.success("Users info retrieved", userInfos));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error getting users info: " + e.getMessage()));
        }
    }

    @PostMapping("/create-test-user")
    public ResponseEntity<ApiResponse> createTestUser() {
        try {
            // Create a verified user for testing
            var testUser = new com.coconutmusic.entity.User();
            testUser.setUsername("testuser1234");
            testUser.setEmail("testuser1234@example.com");
            testUser.setPassword("$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a"); // bcrypt of "password"
            testUser.setIsVerified(true);
            testUser.setIsAdmin(false);
            testUser.setCreatedAt(java.time.LocalDateTime.now());
            testUser.setUpdatedAt(java.time.LocalDateTime.now());

            var saved = userRepository.save(testUser);
            return ResponseEntity.ok(ApiResponse.success("Test user created successfully", saved.getId()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error creating test user: " + e.getMessage()));
        }
    }

    @PostMapping("/test-add-favorite-music/{userId}/{musicId}")
    public ResponseEntity<ApiResponse> testAddFavoriteMusic(
            @PathVariable Long userId,
            @PathVariable Long musicId) {
        try {
            // Check if already exists
            var existingFavorite = favoriteRepository.findByUserIdAndMusicId(userId, musicId);
            if (existingFavorite.isPresent()) {
                return ResponseEntity.ok(ApiResponse.success("Music already in favorites", false));
            }



            // Get user and music entities
            var user = userRepository.findById(userId);
            var music = musicRepository.findById(musicId);

            if (user.isEmpty() || music.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("User or Music not found"));
            }

            var favorite = new com.coconutmusic.entity.Favorite();
            favorite.setUser(user.get());
            favorite.setMusic(music.get());
            favorite.setCreatedAt(java.time.LocalDateTime.now());

            favoriteRepository.save(favorite);
            return ResponseEntity.ok(ApiResponse.success("Music added to favorites", true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error adding to favorites: " + e.getMessage()));
        }
    }

    @PostMapping("/test-add-favorite-playlist/{userId}/{playlistId}")
    public ResponseEntity<ApiResponse> testAddFavoritePlaylist(
            @PathVariable Long userId,
            @PathVariable Long playlistId) {
        try {
            // Check if already exists
            var existingFavorite = favoritePlaylistRepository.findByUserIdAndPlaylistId(userId, playlistId);
            if (existingFavorite.isPresent()) {
                return ResponseEntity.ok(ApiResponse.success("Playlist already in favorites", false));
            }

            // Get user and playlist entities
            var user = userRepository.findById(userId);
            var playlist = playlistRepository.findById(playlistId);

            if (user.isEmpty() || playlist.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("User or Playlist not found"));
            }

            var favoritePlaylist = new com.coconutmusic.entity.FavoritePlaylist();
            favoritePlaylist.setUser(user.get());
            favoritePlaylist.setPlaylist(playlist.get());
            favoritePlaylist.setCreatedAt(java.time.LocalDateTime.now());

            favoritePlaylistRepository.save(favoritePlaylist);
            return ResponseEntity.ok(ApiResponse.success("Playlist added to favorites", true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error adding playlist to favorites: " + e.getMessage()));
        }
    }@GetMapping("/test-get-favorites/{userId}")
    public ResponseEntity<ApiResponse> testGetFavorites(@PathVariable Long userId) {
        try {
            var favoriteMusic = favoriteRepository.findByUserIdOrderByCreatedAtDesc(userId);
            var favoritePlaylists = favoritePlaylistRepository.findByUserIdOrderByCreatedAtDesc(userId,
                org.springframework.data.domain.PageRequest.of(0, 100)).getContent();

            var result = java.util.Map.of(
                "favoriteMusic", favoriteMusic.size(),
                "favoritePlaylists", favoritePlaylists.size(),
                "musicIds", favoriteMusic.stream().map(f -> f.getMusicId()).toList(),
                "playlistIds", favoritePlaylists.stream().map(f -> f.getPlaylistId()).toList()
            );

            return ResponseEntity.ok(ApiResponse.success("Favorites retrieved", result));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error getting favorites: " + e.getMessage()));
        }
    }

    @DeleteMapping("/test-remove-favorite-music/{userId}/{musicId}")
    public ResponseEntity<ApiResponse> testRemoveFavoriteMusic(
            @PathVariable Long userId,
            @PathVariable Long musicId) {
        try {
            var favorite = favoriteRepository.findByUserIdAndMusicId(userId, musicId);
            if (favorite.isPresent()) {
                favoriteRepository.delete(favorite.get());
                return ResponseEntity.ok(ApiResponse.success("Music removed from favorites", true));
            } else {
                return ResponseEntity.ok(ApiResponse.success("Music was not in favorites", false));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error removing from favorites: " + e.getMessage()));
        }
    }

    @DeleteMapping("/test-remove-favorite-playlist/{userId}/{playlistId}")
    public ResponseEntity<ApiResponse> testRemoveFavoritePlaylist(
            @PathVariable Long userId,
            @PathVariable Long playlistId) {
        try {
            var favoritePlaylist = favoritePlaylistRepository.findByUserIdAndPlaylistId(userId, playlistId);
            if (favoritePlaylist.isPresent()) {
                favoritePlaylistRepository.delete(favoritePlaylist.get());
                return ResponseEntity.ok(ApiResponse.success("Playlist removed from favorites", true));
            } else {
                return ResponseEntity.ok(ApiResponse.success("Playlist was not in favorites", false));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error removing playlist from favorites: " + e.getMessage()));
        }
    }

    @GetMapping("/test-check-favorite-music/{userId}/{musicId}")
    public ResponseEntity<ApiResponse> testCheckFavoriteMusic(
            @PathVariable Long userId,
            @PathVariable Long musicId) {
        try {
            var favorite = favoriteRepository.findByUserIdAndMusicId(userId, musicId);
            boolean isFavorite = favorite.isPresent();
            return ResponseEntity.ok(ApiResponse.success("Favorite status checked", isFavorite));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error checking favorite status: " + e.getMessage()));
        }
    }

    @GetMapping("/test-check-favorite-playlist/{userId}/{playlistId}")
    public ResponseEntity<ApiResponse> testCheckFavoritePlaylist(
            @PathVariable Long userId,
            @PathVariable Long playlistId) {
        try {
            var favoritePlaylist = favoritePlaylistRepository.findByUserIdAndPlaylistId(userId, playlistId);
            boolean isFavorite = favoritePlaylist.isPresent();
            return ResponseEntity.ok(ApiResponse.success("Favorite playlist status checked", isFavorite));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error checking favorite playlist status: " + e.getMessage()));
        }
    }

    @GetMapping("/test-available-data")
    public ResponseEntity<ApiResponse> testAvailableData() {
        try {
            var users = userRepository.findAll().stream().limit(5)
                .map(user -> java.util.Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "verified", user.getIsVerified()
                )).toList();

            var music = musicRepository.findAll().stream().limit(5)
                .map(m -> java.util.Map.of(
                    "id", m.getId(),
                    "title", m.getTitle()
                )).toList();

            var playlists = playlistRepository.findAll().stream().limit(5)
                .map(p -> java.util.Map.of(
                    "id", p.getId(),
                    "name", p.getName()
                )).toList();

            var result = java.util.Map.of(
                "users", users,
                "music", music,
                "playlists", playlists
            );

            return ResponseEntity.ok(ApiResponse.success("Available test data", result));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error getting test data: " + e.getMessage()));
        }    }
}
