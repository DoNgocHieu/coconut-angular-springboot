package com.coconutmusic.service;

import com.coconutmusic.dto.request.ArtistCreateRequest;
import com.coconutmusic.dto.request.ArtistUpdateRequest;
import com.coconutmusic.entity.Artist;
import com.coconutmusic.exception.BadRequestException;
import com.coconutmusic.exception.ResourceNotFoundException;
import com.coconutmusic.repository.ArtistRepository;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class AdminArtistService {

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private MusicRepository musicRepository;

    /**
     * Get all artists with filtering and pagination
     */
    public Page<Artist> getAllArtists(Pageable pageable, String search, Boolean isActive) {
        Specification<Artist> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Search by name
            if (search != null && !search.trim().isEmpty()) {
                String searchPattern = "%" + search.toLowerCase() + "%";
                predicates.add(criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("name")), searchPattern));
            }

            // Filter by active status
            if (isActive != null) {
                predicates.add(criteriaBuilder.equal(root.get("isActive"), isActive));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        return artistRepository.findAll(spec, pageable);
    }

    /**
     * Get artist by ID
     */
    public Artist getArtistById(Long id) {
        return artistRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Artist", "id", id));
    }

    /**
     * Create new artist
     */
    public Artist createArtist(ArtistCreateRequest request) {
        // Check if artist name already exists
        if (artistRepository.existsByName(request.getName())) {
            throw new BadRequestException("Artist name already exists: " + request.getName());
        }

        Artist artist = new Artist();
        artist.setName(request.getName());
        artist.setBio(request.getBio());
        artist.setAvatarUrl(request.getAvatarUrl());
        artist.setIsActive(request.getIsActive());

        return artistRepository.save(artist);
    }

    /**
     * Update artist
     */
    public Artist updateArtist(Long id, ArtistUpdateRequest request) {
        Artist artist = getArtistById(id);

        // Check if new name already exists (excluding current artist)
        if (!artist.getName().equals(request.getName()) &&
            artistRepository.existsByName(request.getName())) {
            throw new BadRequestException("Artist name already exists: " + request.getName());
        }

        artist.setName(request.getName());
        artist.setBio(request.getBio());
        artist.setAvatarUrl(request.getAvatarUrl());
        artist.setIsActive(request.getIsActive());

        return artistRepository.save(artist);
    }

    /**
     * Delete artist
     */
    public void deleteArtist(Long id) {
        Artist artist = getArtistById(id);

        // Check if artist has music associated
        long musicCount = musicRepository.countByArtistId(id);
        if (musicCount > 0) {
            throw new BadRequestException("Cannot delete artist with associated music. Please reassign or delete the music first.");
        }

        artistRepository.delete(artist);
    }

    /**
     * Toggle active status
     */
    public Artist toggleActiveStatus(Long id) {
        Artist artist = getArtistById(id);
        artist.setIsActive(!artist.getIsActive());
        return artistRepository.save(artist);
    }

    /**
     * Get artist statistics
     */
    public Map<String, Object> getArtistStats(Long id) {
        Artist artist = getArtistById(id);

        Map<String, Object> stats = new HashMap<>();
        stats.put("artist", artist);
        stats.put("totalMusic", musicRepository.countByArtistId(id));
        stats.put("activeMusicCount", musicRepository.countByArtistIdAndIsActiveTrue(id));

        return stats;
    }

    /**
     * Bulk delete artists
     */
    public void bulkDeleteArtists(Long[] artistIds) {
        List<Long> ids = Arrays.asList(artistIds);

        // Check if any artist has associated music
        for (Long id : ids) {
            long musicCount = musicRepository.countByArtistId(id);
            if (musicCount > 0) {
                Artist artist = getArtistById(id);
                throw new BadRequestException("Cannot delete artist '" + artist.getName() + "' with associated music. Please reassign or delete the music first.");
            }
        }

        List<Artist> artists = artistRepository.findAllById(ids);
        artistRepository.deleteAll(artists);
    }

    /**
     * Bulk toggle active status
     */
    public void bulkToggleActive(Long[] artistIds, boolean active) {
        List<Long> ids = Arrays.asList(artistIds);
        List<Artist> artists = artistRepository.findAllById(ids);

        for (Artist artist : artists) {
            artist.setIsActive(active);
        }

        artistRepository.saveAll(artists);
    }
}
