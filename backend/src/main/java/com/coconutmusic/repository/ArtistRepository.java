package com.coconutmusic.repository;

import com.coconutmusic.entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {

    List<Artist> findByIsActiveTrueOrderByName();

    Optional<Artist> findByNameAndIsActiveTrue(String name);

    Boolean existsByName(String name);

    @Query("SELECT a FROM Artist a WHERE a.isActive = true AND LOWER(a.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Artist> searchByName(@Param("keyword") String keyword);

    @Query("SELECT COUNT(a) FROM Artist a WHERE a.isActive = true")
    Long countActiveArtists();

    @Query("SELECT a FROM Artist a JOIN a.musicList m WHERE a.isActive = true GROUP BY a ORDER BY COUNT(m) DESC")
    List<Artist> findArtistsOrderByMusicCount();
}
