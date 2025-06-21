package com.coconutmusic.controller;

import com.coconutmusic.dto.request.AddToFavoritesRequest;
import com.coconutmusic.dto.request.AddToRecentlyPlayedRequest;
import com.coconutmusic.dto.response.ApiResponse;
import com.coconutmusic.entity.Favorite;
import com.coconutmusic.entity.History;
import com.coconutmusic.entity.MyList;
import com.coconutmusic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    // ===== FAVORITES =====
    @GetMapping("/favorites")
    public ResponseEntity<ApiResponse> getUserFavorites(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "1") Long userId) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Favorite> favorites = userService.getUserFavorites(userId, pageable);

        return ResponseEntity.ok(ApiResponse.success("Favorites retrieved successfully", favorites));
    }

    @PostMapping("/favorites")
    public ResponseEntity<ApiResponse> addToFavorites(
            @RequestBody AddToFavoritesRequest request,
            @RequestParam(defaultValue = "1") Long userId) {

        try {
            Favorite favorite = userService.addToFavorites(userId, request.getMusicId());
            return ResponseEntity.ok(ApiResponse.success("Added to favorites successfully", favorite));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/favorites/{musicId}")
    public ResponseEntity<ApiResponse> removeFromFavorites(
            @PathVariable Long musicId,
            @RequestParam(defaultValue = "1") Long userId) {

        try {
            userService.removeFromFavorites(userId, musicId);
            return ResponseEntity.ok(ApiResponse.success("Removed from favorites successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/favorites/check/{musicId}")
    public ResponseEntity<Map<String, Boolean>> checkIsFavorite(
            @PathVariable Long musicId,
            @RequestParam(defaultValue = "1") Long userId) {

        boolean isFavorite = userService.isFavorite(userId, musicId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isFavorite", isFavorite);
        return ResponseEntity.ok(response);
    }

    // ===== RECENTLY PLAYED =====

    @GetMapping("/recently-played")
    public ResponseEntity<ApiResponse> getUserRecentlyPlayed(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "1") Long userId) {

        Pageable pageable = PageRequest.of(page, size);
        Page<History> recentlyPlayed = userService.getUserRecentlyPlayed(userId, pageable);

        return ResponseEntity.ok(ApiResponse.success("Recently played retrieved successfully", recentlyPlayed));
    }

    @PostMapping("/recently-played")
    public ResponseEntity<ApiResponse> addToRecentlyPlayed(
            @RequestBody AddToRecentlyPlayedRequest request,
            @RequestParam(defaultValue = "1") Long userId) {

        History history = userService.addToRecentlyPlayed(userId, request.getMusicId());
        return ResponseEntity.ok(ApiResponse.success("Added to recently played successfully", history));
    }

    // ===== MY LIST =====

    // Lấy danh sách my-list
    @GetMapping("/my-list")
    public ResponseEntity<ApiResponse> getMyList(
            @RequestParam(defaultValue = "1") Long userId) {

        java.util.List<MyList> myList = userService.getMyList(userId);

        return ResponseEntity.ok(ApiResponse.success("My list retrieved successfully", myList));
    }

    // Thêm vào my-list
    @PostMapping("/my-list")
    public ResponseEntity<ApiResponse> addToMyList(
            @RequestBody Map<String, Long> request,
            @RequestParam(defaultValue = "1") Long userId) {
        try {
            Long musicId = request.get("musicId");
            userService.addToMyList(userId, musicId);
            return ResponseEntity.ok(ApiResponse.success("Added to my list successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    // Xóa khỏi my-list
    @DeleteMapping("/my-list/{musicId}")
    public ResponseEntity<ApiResponse> removeFromMyList(
            @PathVariable Long musicId,
            @RequestParam(defaultValue = "1") Long userId) {
        try {
            userService.removeFromMyList(userId, musicId);
            return ResponseEntity.ok(ApiResponse.success("Removed from my list successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    // Kiểm tra có trong my-list không
    @GetMapping("/my-list/check/{musicId}")
    public ResponseEntity<Map<String, Boolean>> checkInMyList(
            @PathVariable Long musicId,
            @RequestParam(defaultValue = "1") Long userId) {
        boolean isInMyList = userService.isInMyList(userId, musicId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isInMyList", isInMyList);
        return ResponseEntity.ok(response);
    }
}
