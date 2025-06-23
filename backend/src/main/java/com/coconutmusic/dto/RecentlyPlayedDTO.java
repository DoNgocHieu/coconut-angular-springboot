package com.coconutmusic.dto;

import java.time.LocalDateTime;

public class RecentlyPlayedDTO {
    private Long id;
    private Long musicId;
    private String musicTitle;
    private String musicImageUrl;
    private Integer durationSeconds;
    private String artistName;
    private String categoryName;
    private String typeMusic;
    private LocalDateTime playedAt;
    private MusicResponseDto music;

    // Nếu muốn trả thêm tên bài hát, nghệ sĩ, ... thì thêm các trường ở đây

    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getMusicId() { return musicId; }
    public void setMusicId(Long musicId) { this.musicId = musicId; }

    public String getMusicTitle() { return musicTitle; }
    public void setMusicTitle(String musicTitle) { this.musicTitle = musicTitle; }

    public String getMusicImageUrl() { return musicImageUrl; }
    public void setMusicImageUrl(String musicImageUrl) { this.musicImageUrl = musicImageUrl; }

    public Integer getDurationSeconds() { return durationSeconds; }
    public void setDurationSeconds(Integer durationSeconds) { this.durationSeconds = durationSeconds; }

    public String getArtistName() { return artistName; }
    public void setArtistName(String artistName) { this.artistName = artistName; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public String getTypeMusic() { return typeMusic; }
    public void setTypeMusic(String typeMusic) { this.typeMusic = typeMusic; }

    public LocalDateTime getPlayedAt() { return playedAt; }
    public void setPlayedAt(LocalDateTime playedAt) { this.playedAt = playedAt; }

    public MusicResponseDto getMusic() {
        return music;
    }

    public void setMusic(MusicResponseDto music) {
        this.music = music;
    }
}