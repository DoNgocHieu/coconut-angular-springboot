package com.coconutmusic.dto.request;

public class AddToFavoritesRequest {
    private Long musicId;

    // Constructors
    public AddToFavoritesRequest() {}

    public AddToFavoritesRequest(Long musicId) {
        this.musicId = musicId;
    }

    // Getters and Setters
    public Long getMusicId() {
        return musicId;
    }

    public void setMusicId(Long musicId) {
        this.musicId = musicId;
    }
}
