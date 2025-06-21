package com.coconutmusic.controller;

import com.coconutmusic.dto.PlaylistDTO;
import com.coconutmusic.dto.PlaylistCreateRequest;
import com.coconutmusic.dto.response.ApiResponse;
import com.coconutmusic.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/playlists")
@CrossOrigin(origins = "*")
// @PreAuthorize("hasRole('ADMIN')") // Temporarily disabled for testing
public class AdminPlaylistController {

    @Autowired
    private PlaylistService playlistService;

    /**
     * Get all playlists with pagination and sorting (including private)
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getAllPlaylists(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "updatedAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean isPublic) {

        Sort sort = sortDir.equals("desc") ?
            Sort.by(sortBy).descending() :
            Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<PlaylistDTO> playlistPage;

        if (search != null && !search.trim().isEmpty()) {
            // For now, use the existing search method for public playlists
            // TODO: Implement admin search that includes private playlists
            playlistPage = playlistService.searchPublicPlaylists(search, pageable);
        } else if (isPublic != null) {
            if (isPublic) {
                playlistPage = playlistService.getAllPublicPlaylists(pageable);
            } else {
                // For private playlists only, we'll need to implement this in the service
                // For now, return all playlists and filter client-side
                playlistPage = playlistService.getAllPlaylistsForAdmin(pageable);
            }
        } else {
            playlistPage = playlistService.getAllPlaylistsForAdmin(pageable);
        }

        return ResponseEntity.ok(ApiResponse.success("Playlists retrieved successfully", playlistPage));
    }

    /**
     * Get playlist by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getPlaylistById(@PathVariable Long id) {
        try {
            PlaylistDTO playlist = playlistService.getPlaylistById(id);
            return ResponseEntity.ok(ApiResponse.success("Playlist retrieved successfully", playlist));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Create new playlist
     */
    @PostMapping
    public ResponseEntity<ApiResponse> createPlaylist(@Valid @RequestBody PlaylistCreateRequest request) {
        try {
            PlaylistDTO playlist = playlistService.createPlaylist(request);
            return ResponseEntity.ok(ApiResponse.success("Playlist created successfully", playlist));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error creating playlist: " + e.getMessage()));
        }
    }

    /**
     * Update playlist
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updatePlaylist(
            @PathVariable Long id,
            @Valid @RequestBody PlaylistCreateRequest request) {
        try {
            PlaylistDTO playlist = playlistService.updatePlaylist(id, request);
            return ResponseEntity.ok(ApiResponse.success("Playlist updated successfully", playlist));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error updating playlist: " + e.getMessage()));
        }
    }

    /**
     * Delete playlist
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deletePlaylist(@PathVariable Long id) {
        try {
            playlistService.deletePlaylist(id);
            return ResponseEntity.ok(ApiResponse.success("Playlist deleted successfully", ""));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error deleting playlist: " + e.getMessage()));
        }
    }    /**
     * Toggle playlist privacy
     */
    @PatchMapping("/{id}/privacy")
    public ResponseEntity<ApiResponse> togglePlaylistPrivacy(@PathVariable Long id) {
        try {
            PlaylistDTO playlist = playlistService.togglePlaylistPrivacy(id);
            return ResponseEntity.ok(ApiResponse.success("Playlist privacy toggled successfully", playlist));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error toggling playlist privacy: " + e.getMessage()));
        }
    }
}
