package com.coconutmusic.dto;

public class PlaylistCreateRequest {
    private String name;
    private String description;
    private String imageUrl;
    private Boolean isPublic;
    private Long userId;

    // Constructors
    public PlaylistCreateRequest() {}

    public PlaylistCreateRequest(String name, String description, Boolean isPublic, Long userId) {
        this.name = name;
        this.description = description;
        this.isPublic = isPublic;
        this.userId = userId;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
