package com.coconutmusic.controller;

import com.coconutmusic.dto.request.ArtistCreateRequest;
import com.coconutmusic.dto.request.ArtistUpdateRequest;
import com.coconutmusic.dto.response.ApiResponse;
import com.coconutmusic.entity.Artist;
import com.coconutmusic.service.AdminArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/artists")
@CrossOrigin(origins = "*")
// @PreAuthorize("hasRole('ADMIN')") // Temporarily disabled for testing
public class AdminArtistController {

    @Autowired
    private AdminArtistService adminArtistService;

    /**
     * Get all artists with pagination and sorting
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getAllArtists(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean isActive) {

        Sort sort = sortDir.equals("desc") ?
            Sort.by(sortBy).descending() :
            Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Artist> artistPage = adminArtistService.getAllArtists(
            pageable, search, isActive);

        return ResponseEntity.ok(ApiResponse.success("Artists retrieved successfully", artistPage));
    }

    /**
     * Get artist by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getArtistById(@PathVariable Long id) {
        Artist artist = adminArtistService.getArtistById(id);
        return ResponseEntity.ok(ApiResponse.success("Artist retrieved successfully", artist));
    }

    /**
     * Create new artist
     */
    @PostMapping
    public ResponseEntity<ApiResponse> createArtist(@Valid @RequestBody ArtistCreateRequest request) {
        Artist artist = adminArtistService.createArtist(request);
        return ResponseEntity.ok(ApiResponse.success("Artist created successfully", artist));
    }

    /**
     * Update artist
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateArtist(
            @PathVariable Long id,
            @Valid @RequestBody ArtistUpdateRequest request) {
        Artist artist = adminArtistService.updateArtist(id, request);
        return ResponseEntity.ok(ApiResponse.success("Artist updated successfully", artist));
    }

    /**
     * Delete artist
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteArtist(@PathVariable Long id) {
        adminArtistService.deleteArtist(id);
        return ResponseEntity.ok(ApiResponse.success("Artist deleted successfully"));
    }

    /**
     * Toggle artist active status
     */
    @PatchMapping("/{id}/toggle-active")
    public ResponseEntity<ApiResponse> toggleActiveStatus(@PathVariable Long id) {
        Artist artist = adminArtistService.toggleActiveStatus(id);
        return ResponseEntity.ok(ApiResponse.success("Artist status updated successfully", artist));
    }

    /**
     * Get artist statistics
     */
    @GetMapping("/{id}/stats")
    public ResponseEntity<ApiResponse> getArtistStats(@PathVariable Long id) {
        var stats = adminArtistService.getArtistStats(id);
        return ResponseEntity.ok(ApiResponse.success("Artist stats retrieved successfully", stats));
    }

    /**
     * Bulk operations
     */
    @PostMapping("/bulk-delete")
    public ResponseEntity<ApiResponse> bulkDeleteArtists(@RequestBody Long[] artistIds) {
        adminArtistService.bulkDeleteArtists(artistIds);
        return ResponseEntity.ok(ApiResponse.success("Artists deleted successfully"));
    }

    @PostMapping("/bulk-toggle-active")
    public ResponseEntity<ApiResponse> bulkToggleActive(
            @RequestBody Long[] artistIds,
            @RequestParam boolean active) {
        adminArtistService.bulkToggleActive(artistIds, active);
        return ResponseEntity.ok(ApiResponse.success("Artists status updated successfully"));
    }
}
