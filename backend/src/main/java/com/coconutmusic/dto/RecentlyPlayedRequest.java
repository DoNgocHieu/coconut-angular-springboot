package com.coconutmusic.dto;

public class RecentlyPlayedRequest {
    private Long musicId;
    private Long userId;

    // getters and setters
    public Long getMusicId() { return musicId; }
    public void setMusicId(Long musicId) { this.musicId = musicId; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}