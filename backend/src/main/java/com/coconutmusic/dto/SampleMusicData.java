package com.coconutmusic.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SampleMusicData {
    @JsonProperty("_id")
    private String id;

    @JsonProperty("name_music")
    private String nameMusic;

    @JsonProperty("category")
    private String category;

    @JsonProperty("time_format")
    private String timeFormat;

    @JsonProperty("name_singer")
    private String nameSinger;

    @JsonProperty("type")
    private String type;

    @JsonProperty("src_music")
    private String srcMusic;

    @JsonProperty("image_music")
    private String imageMusic;

    @JsonProperty("createdAt")
    private String createdAt;

    @JsonProperty("updatedAt")
    private String updatedAt;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNameMusic() { return nameMusic; }
    public void setNameMusic(String nameMusic) { this.nameMusic = nameMusic; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTimeFormat() { return timeFormat; }
    public void setTimeFormat(String timeFormat) { this.timeFormat = timeFormat; }

    public String getNameSinger() { return nameSinger; }
    public void setNameSinger(String nameSinger) { this.nameSinger = nameSinger; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getSrcMusic() { return srcMusic; }
    public void setSrcMusic(String srcMusic) { this.srcMusic = srcMusic; }

    public String getImageMusic() { return imageMusic; }
    public void setImageMusic(String imageMusic) { this.imageMusic = imageMusic; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }

    // Helper method to parse duration
    public int getDurationSeconds() {
        if (timeFormat == null || timeFormat.isEmpty()) {
            return 180; // Default 3 minutes
        }
        try {
            String[] parts = timeFormat.split(":");
            if (parts.length == 2) {
                int minutes = Integer.parseInt(parts[0]);
                int seconds = Integer.parseInt(parts[1]);
                return minutes * 60 + seconds;
            }
        } catch (NumberFormatException e) {
            // If parsing fails, return default
        }
        return 180;
    }
}
