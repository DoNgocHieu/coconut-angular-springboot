package com.coconutmusic.service;

import com.coconutmusic.dto.PlaylistDTO;
import com.coconutmusic.dto.PlaylistCreateRequest;
import com.coconutmusic.dto.MusicResponseDto;
import com.coconutmusic.dto.CategorySimpleDto;
import com.coconutmusic.dto.ArtistSimpleDto;
import com.coconutmusic.entity.Playlist;
import com.coconutmusic.entity.Music;
import com.coconutmusic.entity.User;
import com.coconutmusic.entity.PlaylistMusic;
import com.coconutmusic.repository.PlaylistRepository;
import com.coconutmusic.repository.MusicRepository;
import com.coconutmusic.repository.UserRepository;
import com.coconutmusic.repository.PlaylistMusicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlaylistMusicRepository playlistMusicRepository;

    public Page<PlaylistDTO> getAllPublicPlaylists(Pageable pageable) {
        Page<Playlist> playlists = playlistRepository.findByIsPublicTrueOrderByUpdatedAtDesc(pageable);
        return playlists.map(PlaylistDTO::new);
    }

    public Page<PlaylistDTO> getUserPlaylists(Long userId, Pageable pageable) {
        Page<Playlist> playlists = playlistRepository.findByUserIdOrderByUpdatedAtDesc(userId, pageable);
        return playlists.map(PlaylistDTO::new);
    }

    public Page<PlaylistDTO> searchPublicPlaylists(String keyword, Pageable pageable) {
        Page<Playlist> playlists = playlistRepository.searchPublicPlaylists(keyword, pageable);
        return playlists.map(PlaylistDTO::new);
    }

    public PlaylistDTO getPlaylistById(Long id) {
        Optional<Playlist> playlist = playlistRepository.findById(id);
        if (playlist.isPresent()) {
            return new PlaylistDTO(playlist.get());
        }
        throw new RuntimeException("Playlist not found with id: " + id);
    }

    public PlaylistDTO createPlaylist(PlaylistCreateRequest request) {
        // Find user
        Optional<User> user = userRepository.findById(request.getUserId());
        if (!user.isPresent()) {
            throw new RuntimeException("User not found with id: " + request.getUserId());
        }

        // Create playlist
        Playlist playlist = new Playlist();
        playlist.setName(request.getName());
        playlist.setDescription(request.getDescription());
        playlist.setImageUrl(request.getImageUrl());
        playlist.setIsPublic(request.getIsPublic() != null ? request.getIsPublic() : false);
        playlist.setUser(user.get());
        playlist.setCreatedAt(LocalDateTime.now());
        playlist.setUpdatedAt(LocalDateTime.now());

        Playlist savedPlaylist = playlistRepository.save(playlist);
        return new PlaylistDTO(savedPlaylist);
    }

    public PlaylistDTO updatePlaylist(Long id, PlaylistCreateRequest request) {
        Optional<Playlist> optionalPlaylist = playlistRepository.findById(id);
        if (!optionalPlaylist.isPresent()) {
            throw new RuntimeException("Playlist not found with id: " + id);
        }

        Playlist playlist = optionalPlaylist.get();

        if (request.getName() != null) {
            playlist.setName(request.getName());
        }
        if (request.getDescription() != null) {
            playlist.setDescription(request.getDescription());
        }
        if (request.getImageUrl() != null) {
            playlist.setImageUrl(request.getImageUrl());
        }
        if (request.getIsPublic() != null) {
            playlist.setIsPublic(request.getIsPublic());
        }

        playlist.setUpdatedAt(LocalDateTime.now());

        Playlist savedPlaylist = playlistRepository.save(playlist);
        return new PlaylistDTO(savedPlaylist);
    }

    public void deletePlaylist(Long id) {
        Optional<Playlist> playlist = playlistRepository.findById(id);
        if (!playlist.isPresent()) {
            throw new RuntimeException("Playlist not found with id: " + id);
        }
        playlistRepository.deleteById(id);
    }

    public void addMusicToPlaylist(Long playlistId, Long musicId) {
        // Check if playlist exists
        Optional<Playlist> playlist = playlistRepository.findById(playlistId);
        if (!playlist.isPresent()) {
            throw new RuntimeException("Playlist not found with id: " + playlistId);
        }

        // Check if music exists
        Optional<Music> music = musicRepository.findById(musicId);
        if (!music.isPresent()) {
            throw new RuntimeException("Music not found with id: " + musicId);
        }

        // Check if music is already in playlist
        Boolean exists = playlistMusicRepository.existsByPlaylistIdAndMusicId(playlistId, musicId);
        if (exists) {
            throw new RuntimeException("Music is already in the playlist");
        }

        // Get the next position
        Long maxPosition = playlistMusicRepository.countByPlaylistId(playlistId);
        Integer nextPosition = maxPosition != null ? maxPosition.intValue() + 1 : 1;

        // Create playlist music entry
        PlaylistMusic playlistMusic = new PlaylistMusic();
        playlistMusic.setPlaylist(playlist.get());
        playlistMusic.setMusic(music.get());
        playlistMusic.setPosition(nextPosition);
        playlistMusic.setAddedAt(LocalDateTime.now());

        playlistMusicRepository.save(playlistMusic);        // Update playlist's updated time
        Playlist playlistEntity = playlist.get();
        playlistEntity.setUpdatedAt(LocalDateTime.now());
        playlistRepository.save(playlistEntity);
    }

    public List<MusicResponseDto> getPlaylistMusic(Long playlistId) {
        List<PlaylistMusic> playlistMusics = playlistMusicRepository.findByPlaylistIdOrderByPositionAsc(playlistId);

        return playlistMusics.stream()
            .map(playlistMusic -> {
                Music music = playlistMusic.getMusic();
                return new MusicResponseDto(
                    music.getId(),
                    music.getTitle(),
                    music.getDurationSeconds(),
                    music.getFileUrl(),
                    music.getImageUrl(),
                    music.getTypeMusic(),
                    music.getCreatedAt(),
                    music.getUpdatedAt(),
                    new CategorySimpleDto(
                        music.getCategory().getId(),
                        music.getCategory().getName(),
                        music.getCategory().getDescription(),
                        music.getCategory().getImageUrl(),
                        music.getCategory().getIsActive()
                    ),
                    new ArtistSimpleDto(
                        music.getArtist().getId(),
                        music.getArtist().getName(),
                        music.getArtist().getAvatarUrl()
                    )
                );
            })
            .collect(Collectors.toList());
    }

    public void removeMusicFromPlaylist(Long playlistId, Long musicId) {
        Optional<PlaylistMusic> playlistMusic = playlistMusicRepository.findByPlaylistIdAndMusicId(playlistId, musicId);
        if (!playlistMusic.isPresent()) {
            throw new RuntimeException("Music not found in playlist");
        }

        playlistMusicRepository.delete(playlistMusic.get());

        // Update playlist's updated time
        Optional<Playlist> playlist = playlistRepository.findById(playlistId);
        if (playlist.isPresent()) {
            Playlist playlistEntity = playlist.get();
            playlistEntity.setUpdatedAt(LocalDateTime.now());
            playlistRepository.save(playlistEntity);
        }
    }
}
