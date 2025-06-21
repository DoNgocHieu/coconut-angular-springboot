package com.coconutmusic.controller;

import com.coconutmusic.dto.request.MusicCreateRequest;
import com.coconutmusic.dto.request.MusicUpdateRequest;
import com.coconutmusic.dto.response.ApiResponse;
import com.coconutmusic.entity.Music;
import com.coconutmusic.service.AdminMusicService;
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
@RequestMapping("/api/admin/music")
@CrossOrigin(origins = "*")
// @PreAuthorize("hasRole('ADMIN')") // Temporarily disabled for testing
public class AdminMusicController {

    @Autowired
    private AdminMusicService adminMusicService;

    /**
     * Get all music with pagination and sorting (including inactive)
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getAllMusic(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long artistId,
            @RequestParam(required = false) Boolean isActive) {

        Sort sort = sortDir.equals("desc") ?
            Sort.by(sortBy).descending() :
            Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Music> musicPage = adminMusicService.getAllMusic(
            pageable, search, categoryId, artistId, isActive);

        return ResponseEntity.ok(ApiResponse.success("Music retrieved successfully", musicPage));
    }

    /**
     * Get music by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getMusicById(@PathVariable Long id) {
        Music music = adminMusicService.getMusicById(id);
        return ResponseEntity.ok(ApiResponse.success("Music retrieved successfully", music));
    }

    /**
     * Create new music
     */
    @PostMapping
    public ResponseEntity<ApiResponse> createMusic(@Valid @RequestBody MusicCreateRequest request) {
        Music music = adminMusicService.createMusic(request);
        return ResponseEntity.ok(ApiResponse.success("Music created successfully", music));
    }

    /**
     * Update music
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateMusic(
            @PathVariable Long id,
            @Valid @RequestBody MusicUpdateRequest request) {
        Music music = adminMusicService.updateMusic(id, request);
        return ResponseEntity.ok(ApiResponse.success("Music updated successfully", music));
    }

    /**
     * Delete music
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteMusic(@PathVariable Long id) {
        adminMusicService.deleteMusic(id);
        return ResponseEntity.ok(ApiResponse.success("Music deleted successfully"));
    }

    /**
     * Toggle music active status
     */
    @PatchMapping("/{id}/toggle-active")
    public ResponseEntity<ApiResponse> toggleActiveStatus(@PathVariable Long id) {
        Music music = adminMusicService.toggleActiveStatus(id);
        return ResponseEntity.ok(ApiResponse.success("Music status updated successfully", music));
    }

    /**
     * Bulk operations
     */
    @PostMapping("/bulk-delete")
    public ResponseEntity<ApiResponse> bulkDeleteMusic(@RequestBody Long[] musicIds) {
        adminMusicService.bulkDeleteMusic(musicIds);
        return ResponseEntity.ok(ApiResponse.success("Music deleted successfully"));
    }

    @PostMapping("/bulk-toggle-active")
    public ResponseEntity<ApiResponse> bulkToggleActive(
            @RequestBody Long[] musicIds,
            @RequestParam boolean active) {
        adminMusicService.bulkToggleActive(musicIds, active);
        return ResponseEntity.ok(ApiResponse.success("Music status updated successfully"));
    }
}
