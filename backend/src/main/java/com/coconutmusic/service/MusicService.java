package com.coconutmusic.service;

import com.coconutmusic.entity.Music;
import com.coconutmusic.entity.MusicType;
import com.coconutmusic.repository.MusicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MusicService {

    @Autowired
    private MusicRepository musicRepository;

    public Page<Music> getMusicByType(MusicType type, Pageable pageable) {
        return musicRepository.findByTypeMusicAndIsActiveTrue(type, pageable);
    }

    public Page<Music> getAllMusic(Pageable pageable) {
        return musicRepository.findByIsActiveTrue(pageable);
    }

    public Music getMusicById(Long id) {
        return musicRepository.findByIdAndIsActiveTrue(id).orElse(null);
    }

    public void incrementPlayCount(Long id) {
        Music music = musicRepository.findById(id).orElse(null);
        if (music != null) {
            music.setPlayCount(music.getPlayCount() + 1);
            musicRepository.save(music);
        }
    }

    public Page<Music> searchMusic(String query, Pageable pageable) {
        return musicRepository.findByTitleContainingIgnoreCaseAndIsActiveTrue(query, pageable);
    }

    public Page<Music> getMusicByCategory(Long categoryId, Pageable pageable) {
        return musicRepository.findByCategoryIdAndIsActiveTrue(categoryId, pageable);
    }

    public Page<Music> getMusicByArtist(Long artistId, Pageable pageable) {
        return musicRepository.findByArtistIdAndIsActiveTrue(artistId, pageable);
    }
}
