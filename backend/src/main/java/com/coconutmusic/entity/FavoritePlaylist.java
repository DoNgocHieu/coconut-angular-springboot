package com.coconutmusic.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "favorite_playlists",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "playlist_id"}))
public class FavoritePlaylist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "playlist_id", nullable = false)
    private Playlist playlist;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public FavoritePlaylist() {}

    public FavoritePlaylist(User user, Playlist playlist) {
        this.user = user;
        this.playlist = playlist;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Playlist getPlaylist() {
        return playlist;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // Helper methods for IDs
    public Long getUserId() { return user != null ? user.getId() : null; }
    public Long getPlaylistId() { return playlist != null ? playlist.getId() : null; }
    public void setUserId(Long userId) {
        // This is used for direct database operations in test endpoints
        // In production, always use setUser() with proper User entity
    }
    public void setPlaylistId(Long playlistId) {
        // This is used for direct database operations in test endpoints
        // In production, always use setPlaylist() with proper Playlist entity
    }
}
