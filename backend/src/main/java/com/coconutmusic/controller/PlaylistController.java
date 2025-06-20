package com.coconutmusic.controller;

import com.coconutmusic.dto.PlaylistDTO;
import com.coconutmusic.dto.PlaylistCreateRequest;
import com.coconutmusic.service.PlaylistService;
import com.coconutmusic.dto.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/playlists")
@CrossOrigin(origins = "*")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;    @GetMapping
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

    @PostMapping
    public ResponseEntity<ApiResponse> createPlaylist(@RequestBody PlaylistCreateRequest request) {
        try {
            PlaylistDTO playlist = playlistService.createPlaylist(request);
            return ResponseEntity.ok(ApiResponse.success("Playlist created successfully", playlist));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error creating playlist: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updatePlaylist(
            @PathVariable Long id,
            @RequestBody PlaylistCreateRequest request) {
        try {
            PlaylistDTO playlist = playlistService.updatePlaylist(id, request);
            return ResponseEntity.ok(ApiResponse.success("Playlist updated successfully", playlist));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error updating playlist: " + e.getMessage()));
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
