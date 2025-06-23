package com.coconutmusic.controller;

import com.coconutmusic.entity.Music;
import com.coconutmusic.entity.MusicType;
import com.coconutmusic.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/music")
@CrossOrigin(origins = "*")
public class MusicController {

    @Autowired
    private MusicService musicService;

    // Root endpoint - GET /api/music
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllMusicRoot(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable;
            if (size == -1) {
                // Lấy tất cả nhạc
                pageable = Pageable.unpaged();
            } else {
                pageable = PageRequest.of(page, size);
            }
            Page<Music> musicPage = musicService.getAllMusic(pageable);

            // Create pagination data object that matches frontend expectations
            Map<String, Object> paginationData = new HashMap<>();
            paginationData.put("content", musicPage.getContent());
            paginationData.put("totalElements", musicPage.getTotalElements());
            paginationData.put("totalPages", musicPage.getTotalPages());
            paginationData.put("number", musicPage.getNumber());
            paginationData.put("size", musicPage.getSize());
            paginationData.put("first", musicPage.isFirst());
            paginationData.put("last", musicPage.isLast());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Music loaded successfully");
            response.put("data", paginationData);
            response.put("timestamp", java.time.LocalDateTime.now().toString());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "An unexpected error occurred. Please try again later.");
            errorResponse.put("data", null);
            errorResponse.put("timestamp", java.time.LocalDateTime.now().toString());

            return ResponseEntity.status(500).body(errorResponse);
        }
    }    @GetMapping("/type/{type}")
    public ResponseEntity<Map<String, Object>> getMusicByType(
            @PathVariable MusicType type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Music> musicPage = musicService.getMusicByType(type, pageable);

            // Create pagination data object that matches frontend expectations
            Map<String, Object> paginationData = new HashMap<>();
            paginationData.put("content", musicPage.getContent());
            paginationData.put("totalElements", musicPage.getTotalElements());
            paginationData.put("totalPages", musicPage.getTotalPages());
            paginationData.put("number", musicPage.getNumber());
            paginationData.put("size", musicPage.getSize());
            paginationData.put("first", musicPage.isFirst());
            paginationData.put("last", musicPage.isLast());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Music loaded successfully");
            response.put("data", paginationData);
            response.put("timestamp", java.time.LocalDateTime.now().toString());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to load music: " + e.getMessage());
            errorResponse.put("data", null);
            errorResponse.put("timestamp", java.time.LocalDateTime.now().toString());

            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllMusic(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Music> musicPage = musicService.getAllMusic(pageable);

            // Create pagination data object that matches frontend expectations
            Map<String, Object> paginationData = new HashMap<>();
            paginationData.put("content", musicPage.getContent());
            paginationData.put("totalElements", musicPage.getTotalElements());
            paginationData.put("totalPages", musicPage.getTotalPages());
            paginationData.put("number", musicPage.getNumber());
            paginationData.put("size", musicPage.getSize());
            paginationData.put("first", musicPage.isFirst());
            paginationData.put("last", musicPage.isLast());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "All music loaded successfully");
            response.put("data", paginationData);
            response.put("timestamp", java.time.LocalDateTime.now().toString());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to load music: " + e.getMessage());
            errorResponse.put("data", null);
            errorResponse.put("timestamp", java.time.LocalDateTime.now().toString());

            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getMusicById(@PathVariable Long id) {
        try {
            Music music = musicService.getMusicById(id);
            if (music != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Music found");
                response.put("data", music);
                response.put("timestamp", java.time.LocalDateTime.now().toString());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> notFoundResponse = new HashMap<>();
                notFoundResponse.put("success", false);
                notFoundResponse.put("message", "Music not found");
                notFoundResponse.put("data", null);
                notFoundResponse.put("timestamp", java.time.LocalDateTime.now().toString());

                return ResponseEntity.status(404).body(notFoundResponse);
            }
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Error retrieving music: " + e.getMessage());
            errorResponse.put("data", null);
            errorResponse.put("timestamp", java.time.LocalDateTime.now().toString());

            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @PostMapping("/{id}/play")
    public ResponseEntity<Map<String, Object>> incrementPlayCount(@PathVariable Long id) {
        try {
            musicService.incrementPlayCount(id);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Play count updated");
            response.put("data", null);
            response.put("timestamp", java.time.LocalDateTime.now().toString());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to update play count: " + e.getMessage());
            errorResponse.put("data", null);
            errorResponse.put("timestamp", java.time.LocalDateTime.now().toString());

            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchMusic(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Music> musicPage = musicService.searchMusic(query, pageable);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Search results");
            response.put("data", musicPage.getContent());
            response.put("totalElements", musicPage.getTotalElements());
            response.put("totalPages", musicPage.getTotalPages());
            response.put("currentPage", page);
            response.put("timestamp", java.time.LocalDateTime.now().toString());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Search failed: " + e.getMessage());
            errorResponse.put("data", null);
            errorResponse.put("timestamp", java.time.LocalDateTime.now().toString());            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    // GET /api/music/category/{categoryId} - Get music by category
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Map<String, Object>> getMusicByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Music> musicPage = musicService.getMusicByCategory(categoryId, pageable);

            // Create pagination data object that matches frontend expectations
            Map<String, Object> paginationData = new HashMap<>();
            paginationData.put("content", musicPage.getContent());
            paginationData.put("totalElements", musicPage.getTotalElements());
            paginationData.put("totalPages", musicPage.getTotalPages());
            paginationData.put("number", musicPage.getNumber());
            paginationData.put("size", musicPage.getSize());
            paginationData.put("first", musicPage.isFirst());
            paginationData.put("last", musicPage.isLast());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Music loaded successfully for category");
            response.put("data", paginationData);
            response.put("timestamp", java.time.LocalDateTime.now().toString());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to load music by category: " + e.getMessage());
            errorResponse.put("data", null);
            errorResponse.put("timestamp", java.time.LocalDateTime.now().toString());

            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}
