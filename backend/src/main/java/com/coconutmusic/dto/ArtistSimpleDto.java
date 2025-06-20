package com.coconutmusic.dto;

public class ArtistSimpleDto {
    private Long id;
    private String name;
    private String imageUrl;

    // Constructors
    public ArtistSimpleDto() {}

    public ArtistSimpleDto(Long id, String name, String imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
