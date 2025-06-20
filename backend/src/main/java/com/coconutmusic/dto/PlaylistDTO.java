package com.coconutmusic.dto;

import com.coconutmusic.entity.Playlist;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class PlaylistDTO {
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private Boolean isPublic;
    private Long songCount;
    private Integer totalDurationSeconds;
    private String createdBy;
    private Long userId;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    // Constructors
    public PlaylistDTO() {}

    public PlaylistDTO(Playlist playlist) {
        this.id = playlist.getId();
        this.name = playlist.getName();
        this.description = playlist.getDescription();
        this.imageUrl = playlist.getImageUrl();
        this.isPublic = playlist.getIsPublic();
        this.createdBy = playlist.getUser() != null ? playlist.getUser().getUsername() : "Unknown";
        this.userId = playlist.getUser() != null ? playlist.getUser().getId() : null;
        this.createdAt = playlist.getCreatedAt();
        this.updatedAt = playlist.getUpdatedAt();
        this.songCount = (long) (playlist.getPlaylistMusic() != null ? playlist.getPlaylistMusic().size() : 0);

        // Calculate total duration
        if (playlist.getPlaylistMusic() != null) {
            this.totalDurationSeconds = playlist.getPlaylistMusic().stream()
                .mapToInt(pm -> pm.getMusic() != null ? pm.getMusic().getDurationSeconds() : 0)
                .sum();
        } else {
            this.totalDurationSeconds = 0;
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }

    public Long getSongCount() { return songCount; }
    public void setSongCount(Long songCount) { this.songCount = songCount; }

    public Integer getTotalDurationSeconds() { return totalDurationSeconds; }
    public void setTotalDurationSeconds(Integer totalDurationSeconds) { this.totalDurationSeconds = totalDurationSeconds; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
