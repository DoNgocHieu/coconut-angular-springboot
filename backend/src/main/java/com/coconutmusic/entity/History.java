package com.coconutmusic.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.coconutmusic.dto.ArtistSimpleDto;
import com.coconutmusic.dto.CategorySimpleDto;
import com.coconutmusic.dto.MusicResponseDto;
import com.coconutmusic.dto.RecentlyPlayedDTO;
import org.springframework.data.domain.Page;

@Entity
@Table(name = "history")
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "music_id", nullable = false)
    private Music music;

    @CreationTimestamp
    @Column(name = "played_at", updatable = false)
    private LocalDateTime playedAt;

    // Constructors
    public History() {}

    public History(User user, Music music) {
        this.user = user;
        this.music = music;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Music getMusic() { return music; }
    public void setMusic(Music music) { this.music = music; }

    public LocalDateTime getPlayedAt() { return playedAt; }
    public void setPlayedAt(LocalDateTime playedAt) { this.playedAt = playedAt; }

    public static List<RecentlyPlayedDTO> toDtoList(Page<History> page) {
        return page.getContent().stream().map(history -> {
            RecentlyPlayedDTO dto = new RecentlyPlayedDTO();
            dto.setId(history.getId());
            dto.setPlayedAt(history.getPlayedAt());
            // Tạo object MusicDTO lồng vào
            MusicResponseDto music = new MusicResponseDto();
            music.setId(history.getMusic().getId());
            music.setTitle(history.getMusic().getTitle());
            music.setImageUrl(history.getMusic().getImageUrl());
            music.setDurationSeconds(history.getMusic().getDurationSeconds());
            music.setTypeMusic(history.getMusic().getTypeMusic());
            music.setFileUrl(history.getMusic().getFileUrl());
            // Artist
            if (history.getMusic().getArtist() != null) {
                ArtistSimpleDto artist = new ArtistSimpleDto();
                artist.setId(history.getMusic().getArtist().getId());
                artist.setName(history.getMusic().getArtist().getName());
                music.setArtist(artist);
            }
            // Category
            if (history.getMusic().getCategory() != null) {
                CategorySimpleDto category = new CategorySimpleDto();
                category.setId(history.getMusic().getCategory().getId());
                category.setName(history.getMusic().getCategory().getName());
                music.setCategory(category);
            }
            dto.setMusic(music);
            return dto;
        }).collect(Collectors.toList());
    }
}
