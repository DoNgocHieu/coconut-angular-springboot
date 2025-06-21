package com.coconutmusic.dto.request;

public class AddToMyListRequest {
    private Long musicId;

    // Constructors
    public AddToMyListRequest() {}

    public AddToMyListRequest(Long musicId) {
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