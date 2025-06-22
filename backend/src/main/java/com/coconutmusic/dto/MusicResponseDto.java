package com.coconutmusic.dto;

import com.coconutmusic.entity.MusicType;

import java.time.LocalDateTime;

public class MusicResponseDto {
    private Long id;
    private String title;
    private Integer durationSeconds;
    private String fileUrl;
    private String imageUrl;
    private MusicType typeMusic;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Category info (avoid circular reference)
    private CategorySimpleDto category;

    // Artist info
    private ArtistSimpleDto artist;

    // Constructors
    public MusicResponseDto() {}

    public MusicResponseDto(Long id, String title, Integer durationSeconds, String fileUrl,
                           String imageUrl, MusicType typeMusic, LocalDateTime createdAt,
                           LocalDateTime updatedAt, CategorySimpleDto category, ArtistSimpleDto artist) {
        this.id = id;
        this.title = title;
        this.durationSeconds = durationSeconds;
        this.fileUrl = fileUrl;
        this.imageUrl = imageUrl;
        this.typeMusic = typeMusic;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.category = category;
        this.artist = artist;
    }

    public MusicResponseDto(com.coconutmusic.entity.Music music) {
        this.id = music.getId();
        this.title = music.getTitle();
        this.durationSeconds = music.getDurationSeconds();
        this.fileUrl = music.getFileUrl();
        this.imageUrl = music.getImageUrl();
        this.typeMusic = music.getTypeMusic();
        this.createdAt = music.getCreatedAt();
        this.updatedAt = music.getUpdatedAt();
        if (music.getCategory() != null) {
            this.category = new CategorySimpleDto(
            music.getCategory().getId(),
            music.getCategory().getName(),
            music.getCategory().getDescription(),
            music.getCategory().getImageUrl(),
            music.getCategory().getIsActive()
            );
        } else {
            this.category = null;
        }
        this.artist = music.getArtist() != null ? new ArtistSimpleDto(
            music.getArtist().getId(),
            music.getArtist().getName(),
            music.getArtist().getAvatarUrl() 
        ) : null;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getDurationSeconds() { return durationSeconds; }
    public void setDurationSeconds(Integer durationSeconds) { this.durationSeconds = durationSeconds; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public MusicType getTypeMusic() { return typeMusic; }
    public void setTypeMusic(MusicType typeMusic) { this.typeMusic = typeMusic; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public CategorySimpleDto getCategory() { return category; }
    public void setCategory(CategorySimpleDto category) { this.category = category; }

    public ArtistSimpleDto getArtist() { return artist; }
    public void setArtist(ArtistSimpleDto artist) { this.artist = artist; }
}
