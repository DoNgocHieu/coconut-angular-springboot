package com.coconutmusic.service;

import com.coconutmusic.dto.MyListDTO;
import com.coconutmusic.entity.Favorite;
import com.coconutmusic.entity.History;
import com.coconutmusic.entity.Music;
import com.coconutmusic.entity.MyList;
import com.coconutmusic.entity.User;
import com.coconutmusic.exception.ResourceNotFoundException;
import com.coconutmusic.repository.FavoriteRepository;
import com.coconutmusic.repository.HistoryRepository;
import com.coconutmusic.repository.MusicRepository;
import com.coconutmusic.repository.MyListRepository;
import com.coconutmusic.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private MyListRepository myListRepository;    // ===== FAVORITES =====
      public Page<Favorite> getUserFavorites(Long userId, Pageable pageable) {
        // Validate user exists
        getUserById(userId);
        return favoriteRepository.findByUserIdWithMusicOrderByCreatedAtDesc(userId, pageable);
    }

    public Favorite addToFavorites(Long userId, Long musicId) {
        User user = getUserById(userId);
        Music music = getMusicById(musicId);

        // Check if already exists
        if (favoriteRepository.existsByUserIdAndMusicId(userId, musicId)) {
            throw new IllegalArgumentException("Music is already in favorites");
        }

        Favorite favorite = new Favorite(user, music);
        return favoriteRepository.save(favorite);
    }    public void removeFromFavorites(Long userId, Long musicId) {
        // Validate user and music exist
        getUserById(userId);
        getMusicById(musicId);

        if (!favoriteRepository.existsByUserIdAndMusicId(userId, musicId)) {
            throw new ResourceNotFoundException("Favorite not found");
        }

        favoriteRepository.deleteByUserIdAndMusicId(userId, musicId);
    }

    public boolean isFavorite(Long userId, Long musicId) {
        return favoriteRepository.existsByUserIdAndMusicId(userId, musicId);
    }

    // ===== RECENTLY PLAYED =====
      public Page<History> getUserRecentlyPlayed(Long userId, Pageable pageable) {
        // Validate user exists
        getUserById(userId);
        return historyRepository.findByUserIdOrderByPlayedAtDesc(userId, pageable);
    }

    public History addToRecentlyPlayed(Long userId, Long musicId) {
        User user = getUserById(userId);
        Music music = getMusicById(musicId);

        History history = new History(user, music);
        return historyRepository.save(history);
    }

    // ===== MY LIST =====
public java.util.List<MyListDTO> getMyList(Long userId) {
    getUserById(userId);
    return myListRepository.findByUser_IdOrderByCreatedAtDesc(userId)
        .stream()
        .map(MyListDTO::new)
        .toList();
}

public MyList addToMyList(Long userId, Long musicId) {
    User user = getUserById(userId);
    Music music = getMusicById(musicId);

    if (myListRepository.existsByUser_IdAndMusic_Id(userId, musicId)) {
        throw new IllegalArgumentException("Music is already in my list");
    }

    MyList myList = new MyList(user, music);
    return myListRepository.save(myList);
}

public void removeFromMyList(Long userId, Long musicId) {
    getUserById(userId);
    getMusicById(musicId);

    if (!myListRepository.existsByUser_IdAndMusic_Id(userId, musicId)) {
        throw new ResourceNotFoundException("MyList entry not found");
    }

    myListRepository.deleteByUser_IdAndMusic_Id(userId, musicId);
}

public boolean isInMyList(Long userId, Long musicId) {
    return myListRepository.existsByUser_IdAndMusic_Id(userId, musicId);
}

    // ===== HELPER METHODS =====

    private User getUserById(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    private Music getMusicById(Long musicId) {
        return musicRepository.findById(musicId)
            .orElseThrow(() -> new ResourceNotFoundException("Music not found with id: " + musicId));
    }
}
