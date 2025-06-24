package com.coconutmusic.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ArtistUpdateRequest {
    @NotBlank(message = "Artist name is required")
    @Size(max = 200, message = "Artist name must not exceed 200 characters")
    private String name;

    @Size(max = 1000, message = "Bio must not exceed 1000 characters")
    private String bio;

    private String avatarUrl;

    private Boolean isActive;

    // Constructors
    public ArtistUpdateRequest() {}

    public ArtistUpdateRequest(String name, String bio, String avatarUrl, Boolean isActive) {
        this.name = name;
        this.bio = bio;
        this.avatarUrl = avatarUrl;
        this.isActive = isActive;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
