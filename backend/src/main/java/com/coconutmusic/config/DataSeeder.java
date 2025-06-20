package com.coconutmusic.config;

import com.coconutmusic.entity.*;
import com.coconutmusic.repository.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.*;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private BannerRepository bannerRepository;

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private PlaylistMusicRepository playlistMusicRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final ObjectMapper objectMapper = new ObjectMapper();    // Data Transfer Object for JSON parsing
    public static class SampleMusicData {
        public String _id;
        public String name_music;
        public String category;
        public String time_format;
        public String name_singer;
        public String type;
        public String src_music;
        public String image_music;
        public String createdAt;
        public String updatedAt;
        public Integer __v;

        // Getters and setters
        public String getName_music() { return name_music; }
        public void setName_music(String name_music) { this.name_music = name_music; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public String getTime_format() { return time_format; }
        public void setTime_format(String time_format) { this.time_format = time_format; }
        public String getName_singer() { return name_singer; }
        public void setName_singer(String name_singer) { this.name_singer = name_singer; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public String getSrc_music() { return src_music; }
        public void setSrc_music(String src_music) { this.src_music = src_music; }
        public String getImage_music() { return image_music; }
        public void setImage_music(String image_music) { this.image_music = image_music; }
    }

    // Wrapper class for JSON response format
    public static class SampleDataResponse {
        public String message;
        public Boolean success;
        public List<SampleMusicData> data;

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public Boolean getSuccess() { return success; }
        public void setSuccess(Boolean success) { this.success = success; }
        public List<SampleMusicData> getData() { return data; }
        public void setData(List<SampleMusicData> data) { this.data = data; }
    }@Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            seedData();
        }
    }

    private void seedData() {
        try {
            System.out.println("🌱 Starting to seed data from sample files...");

            // 1. Create Users
            List<User> users = createUsers();
            System.out.println("✅ Created " + users.size() + " users");

            // 2. Create Categories
            List<Category> categories = createCategories();
            System.out.println("✅ Created " + categories.size() + " categories");

            // 3. Create Artists from sample data
            List<Artist> artists = createArtistsFromSamples();
            System.out.println("✅ Created " + artists.size() + " artists");

            // 4. Create Music from sample files
            List<Music> musicList = createMusicFromSamples(categories, artists, users);
            System.out.println("✅ Created " + musicList.size() + " songs");

            // 5. Create Playlists
            createPlaylistsFromData(users, musicList);
            System.out.println("✅ Created playlists");

            // 6. Create Banners
            createBanners();
            System.out.println("✅ Created banners");

            System.out.println("🎉 Sample data has been seeded successfully!");

        } catch (Exception e) {
            System.err.println("❌ Error seeding data: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private List<User> createUsers() {
        List<User> users = new ArrayList<>();

        // Admin user
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@coconutmusic.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setIsAdmin(true);
        admin.setIsVerified(true);
        admin.setCreatedAt(LocalDateTime.now());
        admin.setUpdatedAt(LocalDateTime.now());
        users.add(userRepository.save(admin));

        // Regular users
        String[] usernames = {"musiclover", "playlistpro", "melomaniac", "soundseeker", "rhythmfan"};
        String[] emails = {"musiclover@example.com", "playlistpro@example.com",
                          "melomaniac@example.com", "soundseeker@example.com", "rhythmfan@example.com"};

        for (int i = 0; i < usernames.length; i++) {
            User user = new User();
            user.setUsername(usernames[i]);
            user.setEmail(emails[i]);
            user.setPassword(passwordEncoder.encode("password123"));
            user.setIsAdmin(false);
            user.setIsVerified(true);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            users.add(userRepository.save(user));
        }

        return users;
    }

    private List<Category> createCategories() {
        List<Category> categories = new ArrayList<>();

        // Categories mapped from sample data
        String[][] categoryData = {
            {"VN Lofi", "Những bản nhạc lofi Việt Nam thư giãn", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"},
            {"EDM", "Electronic Dance Music - Nhạc điện tử sôi động", "https://images.unsplash.com/photo-1571974599782-87624638275d?w=400"},
            {"Chill", "Nhạc thư giãn, êm dịu", "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400"},
            {"Trending", "Nhạc thịnh hành, xu hướng mới nhất", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"},
            {"Pop", "Nhạc pop hiện đại", "https://images.unsplash.com/photo-1574267432553-b38e22ad7055?w=400"},
            {"Hip Hop", "Nhạc hip hop và rap", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"},
            {"Rock", "Nhạc rock và alternative", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"},
            {"Jazz", "Nhạc jazz cổ điển và hiện đại", "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400"}
        };

        for (String[] data : categoryData) {
            Category category = new Category();
            category.setName(data[0]);
            category.setDescription(data[1]);
            category.setImageUrl(data[2]);
            category.setIsActive(true);
            category.setCreatedAt(LocalDateTime.now());
            category.setUpdatedAt(LocalDateTime.now());
            categories.add(categoryRepository.save(category));
        }

        return categories;
    }    private List<Artist> createArtistsFromSamples() {
        List<Artist> artists = new ArrayList<>();
        Set<String> artistNames = new HashSet<>();

        // Read all sample files to extract unique artists
        String[] sampleFiles = {"samples/vn_lofi.json", "samples/new_music.json", "samples/trending_music.json",
                               "samples/top_view_music.json", "samples/favorite_music.json"};

        for (String fileName : sampleFiles) {
            try {
                ClassPathResource resource = new ClassPathResource(fileName);
                if (resource.exists()) {
                    InputStream inputStream = resource.getInputStream();

                    List<SampleMusicData> samples;

                    // Try to parse as response wrapper first
                    try {
                        SampleDataResponse response = objectMapper.readValue(inputStream, SampleDataResponse.class);
                        samples = response.getData();
                    } catch (Exception e) {
                        // Fallback to direct array parsing
                        inputStream = resource.getInputStream(); // Re-open the stream
                        samples = objectMapper.readValue(inputStream, new TypeReference<List<SampleMusicData>>() {});
                    }

                    for (SampleMusicData sample : samples) {
                        if (sample.getName_singer() != null && !sample.getName_singer().trim().isEmpty()) {
                            // Clean artist name - remove version info in parentheses
                            String artistName = sample.getName_singer()
                                .replaceAll("\\(.*?\\)", "") // Remove content in parentheses
                                .replaceAll("\\s*-\\s*", ", ") // Replace dashes with commas
                                .replaceAll("\\s*x\\s*", " ft. ") // Replace x with ft.
                                .trim();

                            if (!artistName.isEmpty() && artistName.length() < 100) {
                                artistNames.add(artistName);
                            }
                        }
                    }
                }
            } catch (IOException e) {
                System.err.println("Could not read sample file: " + fileName + " - " + e.getMessage());
            }
        }

        // Add default artist if no artists found
        if (artistNames.isEmpty()) {
            artistNames.add("Unknown Artist");
        }

        // Create artists from unique names
        for (String artistName : artistNames) {
            if (artists.size() >= 50) break; // Limit to 50 artists

            Artist artist = new Artist();
            artist.setName(artistName);
            artist.setBio("Talented artist in the music industry");
            artist.setAvatarUrl("https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop");
            artist.setIsActive(true);
            artist.setCreatedAt(LocalDateTime.now());
            artist.setUpdatedAt(LocalDateTime.now());
            artists.add(artistRepository.save(artist));
        }

        return artists;
    }

    private List<Music> createMusicFromSamples(List<Category> categories, List<Artist> artists, List<User> users) {
        List<Music> allMusic = new ArrayList<>();        // Sample files to load with their corresponding types
        Map<String, MusicType> sampleFiles = new HashMap<>();
        sampleFiles.put("static/samples/favorite_music.json", MusicType.FAVORITE);
        sampleFiles.put("static/samples/trending_music.json", MusicType.TRENDING);
        sampleFiles.put("static/samples/new_music.json", MusicType.NEW_MUSIC);
        sampleFiles.put("static/samples/top_view_music.json", MusicType.TOP_VIEW);
        sampleFiles.put("static/samples/vn_lofi.json", MusicType.VN_LOFI);User adminUser = users.get(0); // Use admin user as uploader

        for (Map.Entry<String, MusicType> entry : sampleFiles.entrySet()) {
            String fileName = entry.getKey();
            MusicType musicType = entry.getValue();

            System.out.println("🔍 Attempting to load: " + fileName + " for type: " + musicType);

            try {
                ClassPathResource resource = new ClassPathResource(fileName);
                System.out.println("📂 Resource exists: " + resource.exists() + " for " + fileName);
                if (resource.exists()) {
                    InputStream inputStream = resource.getInputStream();

                    List<SampleMusicData> samples;

                    // Try to parse as response wrapper first
                    try {
                        SampleDataResponse response = objectMapper.readValue(inputStream, SampleDataResponse.class);
                        samples = response.getData();
                        System.out.println("📁 Loading " + samples.size() + " songs from " + fileName + " (wrapper format)");
                    } catch (Exception e) {
                        // Fallback to direct array parsing
                        inputStream = resource.getInputStream(); // Re-open the stream
                        samples = objectMapper.readValue(inputStream, new TypeReference<List<SampleMusicData>>() {});
                        System.out.println("📁 Loading " + samples.size() + " songs from " + fileName + " (direct array format)");
                    }

                    for (SampleMusicData sample : samples) {
                        Music music = createMusicFromSample(sample, categories, artists, adminUser, musicType);
                        if (music != null) {
                            allMusic.add(musicRepository.save(music));
                        }
                    }
                }
            } catch (Exception e) {
                System.err.println("❌ Error loading " + fileName + ": " + e.getMessage());
                e.printStackTrace();
            }
        }

        System.out.println("🎵 Total music loaded: " + allMusic.size());
        return allMusic;
    }

    private Music createMusicFromSample(SampleMusicData sample, List<Category> categories, List<Artist> artists, User uploader, MusicType musicType) {
        if (sample.getName_music() == null || sample.getName_music().trim().isEmpty()) {
            return null;
        }

        Music music = new Music();
        music.setTitle(sample.getName_music().trim());
        music.setDurationSeconds(parseDuration(sample.getTime_format()));
        music.setFileUrl(sample.getSrc_music() != null ? sample.getSrc_music() : "");
        music.setImageUrl(sample.getImage_music() != null ? sample.getImage_music() : "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300");
        music.setTypeMusic(musicType);
        music.setPlayCount((long)(Math.random() * 10000)); // Random play count
        music.setLikeCount((long)(Math.random() * 1000)); // Random like count
        music.setIsActive(true);
        music.setCreatedAt(LocalDateTime.now());
        music.setUpdatedAt(LocalDateTime.now());

        // Set artist
        Artist artist = findOrCreateArtist(sample.getName_singer(), artists);
        music.setArtist(artist);

        // Set category
        Category category = findCategoryByName(sample.getCategory(), categories);
        music.setCategory(category);

        // Set uploaded by admin
        music.setUploadedBy(uploader);

        return music;
    }

    private int parseDuration(String timeFormat) {
        if (timeFormat == null || timeFormat.trim().isEmpty()) {
            return 180; // Default 3 minutes
        }

        try {
            String[] parts = timeFormat.split(":");
            if (parts.length == 2) {
                int minutes = Integer.parseInt(parts[0]);
                int seconds = Integer.parseInt(parts[1]);
                return minutes * 60 + seconds;
            }
        } catch (NumberFormatException e) {
            // Ignore and use default
        }

        return 180; // Default 3 minutes
    }

    private Artist findOrCreateArtist(String artistName, List<Artist> existingArtists) {
        if (artistName == null || artistName.trim().isEmpty()) {
            return existingArtists.get(0); // Return first artist as default
        }

        String cleanName = artistName.trim();

        // Check if artist already exists
        for (Artist artist : existingArtists) {
            if (artist.getName().equalsIgnoreCase(cleanName)) {
                return artist;
            }
        }

        // Create new artist if not found and we haven't reached limit
        if (existingArtists.size() < 50) {
            Artist newArtist = new Artist();
            newArtist.setName(cleanName);
            newArtist.setBio("Biography for " + cleanName);
            newArtist.setAvatarUrl("https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300");
            newArtist.setIsActive(true);
            newArtist.setCreatedAt(LocalDateTime.now());
            newArtist.setUpdatedAt(LocalDateTime.now());

            Artist savedArtist = artistRepository.save(newArtist);
            existingArtists.add(savedArtist);
            return savedArtist;
        }

        return existingArtists.get(0); // Return first artist if limit reached
    }

    private Category findCategoryByName(String categoryName, List<Category> categories) {
        if (categoryName == null) {
            return categories.get(0); // Return first category as default
        }

        String cleanName = categoryName.toLowerCase().trim();

        // Map sample categories to our categories
        Map<String, String> categoryMapping = new HashMap<>();
        categoryMapping.put("edm", "EDM");
        categoryMapping.put("chill", "Chill");
        categoryMapping.put("trending", "Trending");
        categoryMapping.put("pop", "Pop");
        categoryMapping.put("rock", "Rock");
        categoryMapping.put("hip hop", "Hip Hop");
        categoryMapping.put("hiphop", "Hip Hop");
        categoryMapping.put("jazz", "Jazz");
        categoryMapping.put("lofi", "VN Lofi");
        categoryMapping.put("vn-lofi", "VN Lofi");

        String mappedCategory = categoryMapping.get(cleanName);
        if (mappedCategory != null) {
            for (Category category : categories) {
                if (category.getName().equalsIgnoreCase(mappedCategory)) {
                    return category;
                }
            }
        }

        // Fallback to first category
        return categories.get(0);
    }

    private void createPlaylistsFromData(List<User> users, List<Music> allMusic) {
        if (allMusic.isEmpty()) {
            System.out.println("⚠️ No music available to create playlists");
            return;
        }

        String[][] playlistData = {
            {"🎵 Trending Hits", "The hottest tracks right now", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", "true"},
            {"💖 My Favorites", "My all-time favorite songs", "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", "false"},
            {"🌅 Morning Vibes", "Perfect songs to start your day", "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300", "true"},
            {"🎧 Lofi Chill", "Relaxing lofi beats", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300", "true"},
            {"🔥 Workout Mix", "High energy songs for workout", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300", "true"},
            {"🌙 Night Mood", "Mellow songs for evening", "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300", "false"},
            {"🎤 Top Vocals", "Amazing vocal performances", "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300", "true"},
            {"📻 Radio Hits", "Popular radio songs", "https://images.unsplash.com/photo-1520637836862-4d197d17c26a?w=300", "true"},
            {"🎹 Instrumental", "Beautiful instrumental music", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", "false"},
            {"🌍 World Music", "Music from around the world", "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", "true"}
        };

        Collections.shuffle(allMusic); // Shuffle music for random distribution

        for (int i = 0; i < playlistData.length; i++) {
            String[] data = playlistData[i];

            Playlist playlist = new Playlist();
            playlist.setName(data[0]);
            playlist.setDescription(data[1]);
            playlist.setImageUrl(data[2]);
            playlist.setIsPublic(Boolean.parseBoolean(data[3]));
            playlist.setUser(users.get(i % users.size())); // Distribute among users
            playlist.setCreatedAt(LocalDateTime.now());
            playlist.setUpdatedAt(LocalDateTime.now());

            Playlist savedPlaylist = playlistRepository.save(playlist);

            // Add 5-15 random songs to each playlist
            int songCount = 5 + (int)(Math.random() * 11); // 5-15 songs
            Set<Integer> usedIndices = new HashSet<>();

            for (int j = 0; j < songCount && usedIndices.size() < allMusic.size(); j++) {
                int randomIndex;
                do {
                    randomIndex = (int)(Math.random() * allMusic.size());
                } while (usedIndices.contains(randomIndex));

                usedIndices.add(randomIndex);

                PlaylistMusic playlistMusic = new PlaylistMusic();
                playlistMusic.setPlaylist(savedPlaylist);
                playlistMusic.setMusic(allMusic.get(randomIndex));
                playlistMusic.setPosition(j + 1);
                playlistMusic.setAddedAt(LocalDateTime.now());

                playlistMusicRepository.save(playlistMusic);
            }

            System.out.println("📂 Created playlist: " + playlist.getName() + " with " + songCount + " songs");
        }
    }

    private void createBanners() {
        String[][] bannerData = {
            {"🎵 Discover New Music", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", "/music", "1"},
            {"🎧 Premium Features", "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800", "/premium", "2"},
            {"📱 Mobile App Available", "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800", "/download", "3"}        };

        for (String[] data : bannerData) {
            Banner banner = new Banner();
            banner.setTitle(data[0]);
            banner.setImageUrl(data[1]);
            banner.setLinkUrl(data[2]);
            banner.setSortOrder(Integer.parseInt(data[3]));
            banner.setIsActive(true);
            banner.setCreatedAt(LocalDateTime.now());
            banner.setUpdatedAt(LocalDateTime.now());

            bannerRepository.save(banner);
        }
    }
}
