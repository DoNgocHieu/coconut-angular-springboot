-- Script để tạo lại dữ liệu mẫu cho Coconut Music
-- Chạy script này sau khi backend đã tạo lại các bảng

-- Insert Categories
INSERT INTO categories (name, description, image_url, is_active, created_at, updated_at) VALUES
('Pop', 'Popular music genre', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 1, NOW(), NOW()),
('Rock', 'Rock music genre', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 1, NOW(), NOW()),
('Jazz', 'Jazz music genre', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 1, NOW(), NOW()),
('Classical', 'Classical music genre', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 1, NOW(), NOW()),
('Electronic', 'Electronic music genre', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 1, NOW(), NOW()),
('Hip Hop', 'Hip Hop music genre', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 1, NOW(), NOW()),
('Country', 'Country music genre', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 1, NOW(), NOW()),
('R&B', 'R&B music genre', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 1, NOW(), NOW()),
('Reggae', 'Reggae music genre', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 1, NOW(), NOW()),
('Folk', 'Folk music genre', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 1, NOW(), NOW());

-- Insert Artists
INSERT INTO artists (name, bio, avatar_url, is_active, created_at, updated_at) VALUES
('Unknown Artist', 'Talented artist in the music industry', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 1, NOW(), NOW()),
('BIG SHAQ', 'Biography for BIG SHAQ', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 1, NOW(), NOW()),
('NEFFEX', 'Biography for NEFFEX', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 1, NOW(), NOW()),
('More Plastic', 'Biography for More Plastic', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 1, NOW(), NOW()),
('Joji', 'Biography for Joji', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 1, NOW(), NOW()),
('Drake', 'Biography for Drake', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 1, NOW(), NOW()),
('Taylor Swift', 'Biography for Taylor Swift', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 1, NOW(), NOW()),
('Ed Sheeran', 'Biography for Ed Sheeran', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 1, NOW(), NOW());

-- Insert Users (Admin user)
INSERT INTO users (username, email, password, is_verified, is_admin, avatar_url, created_at, updated_at) VALUES
('admin', 'admin@coconutmusic.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 1, 1, NULL, NOW(), NOW()),
('user1', 'user1@example.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 1, 0, NULL, NOW(), NOW()),
('user2', 'user2@example.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 1, 0, NULL, NOW(), NOW());

-- Insert Music (sẽ được thêm sau khi có artists và categories)
INSERT INTO music (title, duration_seconds, file_url, image_url, type_music, play_count, like_count, is_active, artist_id, category_id, uploaded_by_id, created_at, updated_at) VALUES
('Shape of You', 234, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'TOP_VIEW', 1500, 250, 1, 8, 1, 1, NOW(), NOW()),
('Blinding Lights', 200, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'TRENDING', 1200, 180, 1, 1, 1, 1, NOW(), NOW()),
('Mans Not Hot', 180, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'NEW_MUSIC', 800, 120, 1, 2, 6, 1, NOW(), NOW()),
('Fight Back', 220, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'TRENDING', 950, 160, 1, 3, 2, 1, NOW(), NOW()),
('Slow Dancing in the Dark', 210, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'VN_LOFI', 750, 140, 1, 5, 8, 1, NOW(), NOW()),
('Gods Plan', 198, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'TOP_VIEW', 1300, 200, 1, 6, 6, 1, NOW(), NOW()),
('Anti-Hero', 245, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'NEW_MUSIC', 1100, 190, 1, 7, 1, 1, NOW(), NOW()),
('Perfect', 263, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'FAVORITE', 1400, 220, 1, 8, 1, 1, NOW(), NOW()),
('Bad Habits', 231, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'TRENDING', 980, 170, 1, 8, 1, 1, NOW(), NOW()),
('Castle on the Hill', 261, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'VN_LOFI', 650, 110, 1, 8, 9, 1, NOW(), NOW()),
('Thinking Out Loud', 281, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'FAVORITE', 1250, 185, 1, 8, 1, 1, NOW(), NOW()),
('Photograph', 258, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'NEW_MUSIC', 890, 155, 1, 8, 1, 1, NOW(), NOW()),
('Galway Girl', 170, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'TOP_VIEW', 720, 125, 1, 8, 10, 1, NOW(), NOW()),
('Happier', 207, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'VN_LOFI', 680, 98, 1, 8, 1, 1, NOW(), NOW()),
('Shivers', 207, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'TRENDING', 1050, 175, 1, 8, 1, 1, NOW(), NOW());
