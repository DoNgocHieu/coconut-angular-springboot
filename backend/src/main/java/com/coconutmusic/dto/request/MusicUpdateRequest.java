package com.coconutmusic.dto.request;

import com.coconutmusic.entity.MusicType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class MusicUpdateRequest {

    @NotBlank
    @Size(max = 300)
    private String title;

    @NotNull
    @Min(1)
    private Integer durationSeconds;

    @NotBlank
    private String fileUrl;

    private String imageUrl;

    private Long categoryId;

    private Long artistId;

    private MusicType typeMusic;

    private Boolean isActive;

    // Constructors
    public MusicUpdateRequest() {}

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getDurationSeconds() { return durationSeconds; }
    public void setDurationSeconds(Integer durationSeconds) { this.durationSeconds = durationSeconds; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public Long getArtistId() { return artistId; }
    public void setArtistId(Long artistId) { this.artistId = artistId; }

    public MusicType getTypeMusic() { return typeMusic; }
    public void setTypeMusic(MusicType typeMusic) { this.typeMusic = typeMusic; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
