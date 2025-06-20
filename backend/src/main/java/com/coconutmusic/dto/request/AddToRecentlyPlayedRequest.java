package com.coconutmusic.dto.request;

public class AddToRecentlyPlayedRequest {
    private Long musicId;

    // Constructors
    public AddToRecentlyPlayedRequest() {}

    public AddToRecentlyPlayedRequest(Long musicId) {
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
