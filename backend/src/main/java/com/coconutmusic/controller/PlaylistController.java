package com.coconutmusic.controller;

import com.coconutmusic.dto.PlaylistDTO;
import com.coconutmusic.dto.PlaylistCreateRequest;
import com.coconutmusic.service.PlaylistService;
import com.coconutmusic.dto.response.ApiResponse;
import com.coconutmusic.entity.Playlist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/playlists")
@CrossOrigin(origins = "*")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllPlaylists(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "updatedAt") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search) {

        try {
            Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ?
                Sort.Direction.DESC : Sort.Direction.ASC;

            Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sort));

            Page<PlaylistDTO> playlists;
            if (search != null && !search.trim().isEmpty()) {
                playlists = playlistService.searchPublicPlaylists(search, pageable);
            } else {
                playlists = playlistService.getAllPublicPlaylists(pageable);
            }

            return ResponseEntity.ok(ApiResponse.success("Playlists loaded successfully", playlists));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error loading playlists: " + e.getMessage()));
        }
    }    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse> getUserPlaylists(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "updatedAt") String sort,
            @RequestParam(defaultValue = "desc") String direction) {

        try {
            Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ?
                Sort.Direction.DESC : Sort.Direction.ASC;

            Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sort));
            Page<PlaylistDTO> playlists = playlistService.getUserPlaylists(userId, pageable);

            return ResponseEntity.ok(ApiResponse.success("User playlists loaded successfully", playlists));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error loading user playlists: " + e.getMessage()));
        }
    }

    @GetMapping("/public")
    public ResponseEntity<ApiResponse> getPublicPlaylists(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "updatedAt") String sort,
            @RequestParam(defaultValue = "desc") String direction) {

        try {
            Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ?
                Sort.Direction.DESC : Sort.Direction.ASC;

            Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sort));
            Page<PlaylistDTO> playlists = playlistService.getAllPublicPlaylists(pageable);

            return ResponseEntity.ok(ApiResponse.success("Public playlists loaded successfully", playlists));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error loading public playlists: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getPlaylistById(@PathVariable Long id) {
        try {
            PlaylistDTO playlist = playlistService.getPlaylistById(id);
            return ResponseEntity.ok(ApiResponse.success("Playlist loaded successfully", playlist));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/music")
    public ResponseEntity<ApiResponse> getPlaylistMusic(@PathVariable Long id) {
        try {
            var musicList = playlistService.getPlaylistMusic(id);
            return ResponseEntity.ok(ApiResponse.success("Playlist music loaded successfully", musicList));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Error loading playlist music: " + e.getMessage()));
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createPlaylist(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("isPublic") boolean isPublic,
            @RequestParam("user_id") Long userId,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) {
        try {
            String imageUrl = null;
            if (imageFile != null && !imageFile.isEmpty()) {
                String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path uploadPath = Paths.get("uploads/playlist-images");
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                imageUrl = "/uploads/playlist-images/" + fileName;
            }

            // Tạo request object
            PlaylistCreateRequest request = new PlaylistCreateRequest();
            request.setName(name);
            request.setDescription(description);
            request.setIsPublic(isPublic);
            request.setUserId(userId);
            request.setImageUrl(imageUrl);

            PlaylistDTO playlist = playlistService.createPlaylist(request);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Playlist created successfully");
            response.put("data", playlist);
            response.put("timestamp", java.time.LocalDateTime.now().toString());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace(); // Thêm dòng này để xem lỗi chi tiết trong console
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to create playlist: " + e.getMessage());
            errorResponse.put("data", null);
            errorResponse.put("timestamp", java.time.LocalDateTime.now().toString());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updatePlaylistWithImage(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("isPublic") boolean isPublic,
            @RequestParam("user_id") Long userId,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) {
        try {
            String imageUrl = null;
            if (imageFile != null && !imageFile.isEmpty()) {
                String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path uploadPath = Paths.get("uploads/playlist-images");
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                imageUrl = "/uploads/playlist-images/" + fileName;
            }

            PlaylistCreateRequest request = new PlaylistCreateRequest();
            request.setName(name);
            request.setDescription(description);
            request.setIsPublic(isPublic);
            request.setUserId(userId);
            if (imageUrl != null) {
                request.setImageUrl(imageUrl);
            }

            PlaylistDTO playlist = playlistService.updatePlaylist(id, request);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Playlist updated successfully");
            response.put("data", playlist);
            response.put("timestamp", java.time.LocalDateTime.now().toString());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to update playlist: " + e.getMessage());
            errorResponse.put("data", null);
            errorResponse.put("timestamp", java.time.LocalDateTime.now().toString());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deletePlaylist(@PathVariable Long id) {
        try {
            playlistService.deletePlaylist(id);
            return ResponseEntity.ok(ApiResponse.success("Playlist deleted successfully", ""));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error deleting playlist: " + e.getMessage()));
        }
    }

    @PostMapping("/{playlistId}/music/{musicId}")
    public ResponseEntity<ApiResponse> addMusicToPlaylist(
            @PathVariable Long playlistId,
            @PathVariable Long musicId) {
        try {
            playlistService.addMusicToPlaylist(playlistId, musicId);
            return ResponseEntity.ok(ApiResponse.success("Music added to playlist successfully", ""));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error adding music to playlist: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{playlistId}/music/{musicId}")
    public ResponseEntity<ApiResponse> removeMusicFromPlaylist(
            @PathVariable Long playlistId,
            @PathVariable Long musicId) {
        try {
            playlistService.removeMusicFromPlaylist(playlistId, musicId);
            return ResponseEntity.ok(ApiResponse.success("Music removed from playlist successfully", ""));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error removing music from playlist: " + e.getMessage()));
        }
    }
}
