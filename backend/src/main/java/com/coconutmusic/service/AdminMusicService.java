package com.coconutmusic.service;

import com.coconutmusic.dto.request.MusicCreateRequest;
import com.coconutmusic.dto.request.MusicUpdateRequest;
import com.coconutmusic.entity.Artist;
import com.coconutmusic.entity.Category;
import com.coconutmusic.entity.Music;
import com.coconutmusic.exception.ResourceNotFoundException;
import com.coconutmusic.repository.ArtistRepository;
import com.coconutmusic.repository.CategoryRepository;
import com.coconutmusic.repository.MusicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class AdminMusicService {

    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ArtistRepository artistRepository;

    /**
     * Get all music with filtering and pagination
     */
    public Page<Music> getAllMusic(Pageable pageable, String search, Long categoryId, Long artistId, Boolean isActive) {
        Specification<Music> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Search by title or artist name
            if (search != null && !search.trim().isEmpty()) {
                String searchPattern = "%" + search.toLowerCase() + "%";
                Predicate titlePredicate = criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("title")), searchPattern);
                Predicate artistPredicate = criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("artist").get("name")), searchPattern);
                predicates.add(criteriaBuilder.or(titlePredicate, artistPredicate));
            }

            // Filter by category
            if (categoryId != null) {
                predicates.add(criteriaBuilder.equal(root.get("category").get("id"), categoryId));
            }

            // Filter by artist
            if (artistId != null) {
                predicates.add(criteriaBuilder.equal(root.get("artist").get("id"), artistId));
            }

            // Filter by active status
            if (isActive != null) {
                predicates.add(criteriaBuilder.equal(root.get("isActive"), isActive));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        return musicRepository.findAll(spec, pageable);
    }

    /**
     * Get music by ID
     */
    public Music getMusicById(Long id) {
        return musicRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Music", "id", id));
    }

    /**
     * Create new music
     */
    public Music createMusic(MusicCreateRequest request) {
        Music music = new Music();
        music.setTitle(request.getTitle());
        music.setDurationSeconds(request.getDurationSeconds());
        music.setFileUrl(request.getFileUrl());
        music.setImageUrl(request.getImageUrl());
        music.setTypeMusic(request.getTypeMusic());
        music.setIsActive(request.getIsActive());
        music.setPlayCount(0L);
        music.setLikeCount(0L);

        // Set category if provided
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.getCategoryId()));
            music.setCategory(category);
        }

        // Set artist if provided
        if (request.getArtistId() != null) {
            Artist artist = artistRepository.findById(request.getArtistId())
                .orElseThrow(() -> new ResourceNotFoundException("Artist", "id", request.getArtistId()));
            music.setArtist(artist);
        }

        return musicRepository.save(music);
    }

    /**
     * Update music
     */
    public Music updateMusic(Long id, MusicUpdateRequest request) {
        Music music = getMusicById(id);

        music.setTitle(request.getTitle());
        music.setDurationSeconds(request.getDurationSeconds());
        music.setFileUrl(request.getFileUrl());
        music.setImageUrl(request.getImageUrl());
        music.setTypeMusic(request.getTypeMusic());
        music.setIsActive(request.getIsActive());

        // Update category if provided
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.getCategoryId()));
            music.setCategory(category);
        } else {
            music.setCategory(null);
        }

        // Update artist if provided
        if (request.getArtistId() != null) {
            Artist artist = artistRepository.findById(request.getArtistId())
                .orElseThrow(() -> new ResourceNotFoundException("Artist", "id", request.getArtistId()));
            music.setArtist(artist);
        } else {
            music.setArtist(null);
        }

        return musicRepository.save(music);
    }

    /**
     * Delete music
     */
    public void deleteMusic(Long id) {
        Music music = getMusicById(id);
        musicRepository.delete(music);
    }

    /**
     * Toggle active status
     */
    public Music toggleActiveStatus(Long id) {
        Music music = getMusicById(id);
        music.setIsActive(!music.getIsActive());
        return musicRepository.save(music);
    }

    /**
     * Bulk delete music
     */
    public void bulkDeleteMusic(Long[] musicIds) {
        List<Long> ids = Arrays.asList(musicIds);
        List<Music> musicList = musicRepository.findAllById(ids);
        musicRepository.deleteAll(musicList);
    }

    /**
     * Bulk toggle active status
     */
    public void bulkToggleActive(Long[] musicIds, boolean active) {
        List<Long> ids = Arrays.asList(musicIds);
        List<Music> musicList = musicRepository.findAllById(ids);
        for (Music music : musicList) {
            music.setIsActive(active);
        }
        musicRepository.saveAll(musicList);
    }
}
