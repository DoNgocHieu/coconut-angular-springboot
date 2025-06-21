package com.coconutmusic.dto;

public class MyListDTO {
    private Long id;
    private Long userId; // Thêm trường userId
    private MusicResponseDto music;
    private CategorySimpleDto category; 
    private String createdAt;

    // Constructor
    public MyListDTO(Long id, Long userId, MusicResponseDto music, String createdAt, CategorySimpleDto category) {
        this.id = id;
        this.userId = userId;
        this.music = music;
        this.createdAt = createdAt;
        this.category = category;
    }

    public MyListDTO(com.coconutmusic.entity.MyList myList) {
        this.id = myList.getId();
        this.userId = myList.getUser().getId();
        this.music = new MusicResponseDto(myList.getMusic());
        this.createdAt = myList.getCreatedAt() != null ? myList.getCreatedAt().toString() : null;
        if (myList.getMusic().getCategory() != null) {
            com.coconutmusic.entity.Category categoryEntity = myList.getMusic().getCategory();
            this.category = new CategorySimpleDto(
            categoryEntity.getId(),
            categoryEntity.getName(),
            categoryEntity.getDescription(),
            categoryEntity.getImageUrl(),
            categoryEntity.getIsActive()
            );
        } else {
            this.category = null;
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public MusicResponseDto getMusic() { return music; }
    public void setMusic(MusicResponseDto music) { this.music = music; }

    public CategorySimpleDto getCategory() { return category; }
    public void setCategory(CategorySimpleDto category) { this.category = category; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}