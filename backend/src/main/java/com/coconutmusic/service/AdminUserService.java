package com.coconutmusic.service;

import com.coconutmusic.dto.request.UserCreateRequest;
import com.coconutmusic.dto.request.UserUpdateRequest;
import com.coconutmusic.entity.User;
import com.coconutmusic.exception.BadRequestException;
import com.coconutmusic.exception.ResourceNotFoundException;
import com.coconutmusic.repository.UserRepository;
import com.coconutmusic.repository.PlaylistRepository;
import com.coconutmusic.repository.FavoriteRepository;
import com.coconutmusic.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
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
public class AdminUserService {    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Get all users with filtering and pagination
     */
    public Page<User> getAllUsers(Pageable pageable, String search, Boolean isVerified, Boolean isAdmin) {
        Specification<User> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Search by username or email
            if (search != null && !search.trim().isEmpty()) {
                String searchPattern = "%" + search.toLowerCase() + "%";
                Predicate usernamePredicate = criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("username")), searchPattern);
                Predicate emailPredicate = criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("email")), searchPattern);
                predicates.add(criteriaBuilder.or(usernamePredicate, emailPredicate));
            }

            // Filter by verified status
            if (isVerified != null) {
                predicates.add(criteriaBuilder.equal(root.get("isVerified"), isVerified));
            }

            // Filter by admin status
            if (isAdmin != null) {
                predicates.add(criteriaBuilder.equal(root.get("isAdmin"), isAdmin));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        return userRepository.findAll(spec, pageable);
    }    /**
     * Get user by ID
     */
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    /**
     * Create a new user
     */
    public User createUser(UserCreateRequest request) {
        // Check if username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username already exists: " + request.getUsername());
        }

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists: " + request.getEmail());
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setIsVerified(request.getIsVerified() != null ? request.getIsVerified() : true);
        user.setIsAdmin(request.getIsAdmin() != null ? request.getIsAdmin() : false);

        return userRepository.save(user);
    }

    /**
     * Update user
     */
    public User updateUser(Long id, UserUpdateRequest request) {
        User user = getUserById(id);

        // Check if new username already exists (excluding current user)
        if (request.getUsername() != null &&
            !user.getUsername().equals(request.getUsername()) &&
            userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username already exists: " + request.getUsername());
        }

        // Check if new email already exists (excluding current user)
        if (request.getEmail() != null &&
            !user.getEmail().equals(request.getEmail()) &&
            userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists: " + request.getEmail());
        }

        if (request.getUsername() != null) {
            user.setUsername(request.getUsername());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getAvatarUrl() != null) {
            user.setAvatarUrl(request.getAvatarUrl());
        }
        if (request.getIsVerified() != null) {
            user.setIsVerified(request.getIsVerified());
        }
        if (request.getIsAdmin() != null) {
            user.setIsAdmin(request.getIsAdmin());
        }

        return userRepository.save(user);
    }

    /**
     * Delete user
     */
    public void deleteUser(Long id) {
        User user = getUserById(id);

        // Prevent deletion of the last admin user
        if (user.getIsAdmin() && userRepository.countByIsAdminTrue() <= 1) {
            throw new BadRequestException("Cannot delete the last admin user");
        }

        userRepository.delete(user);
    }

    /**
     * Toggle admin status
     */
    public User toggleAdminStatus(Long id) {
        User user = getUserById(id);

        // Prevent removing admin status from the last admin user
        if (user.getIsAdmin() && userRepository.countByIsAdminTrue() <= 1) {
            throw new BadRequestException("Cannot remove admin status from the last admin user");
        }

        user.setIsAdmin(!user.getIsAdmin());
        return userRepository.save(user);
    }

    /**
     * Toggle verified status
     */
    public User toggleVerifiedStatus(Long id) {
        User user = getUserById(id);
        user.setIsVerified(!user.getIsVerified());
        return userRepository.save(user);
    }

    /**
     * Get user statistics
     */
    public Map<String, Object> getUserStats(Long id) {
        User user = getUserById(id);

        Map<String, Object> stats = new HashMap<>();
        stats.put("user", user);
        stats.put("totalPlaylists", playlistRepository.countByUserId(id));
        stats.put("totalFavorites", favoriteRepository.countByUserId(id));
        stats.put("totalHistory", historyRepository.countByUserId(id));

        return stats;
    }

    /**
     * Bulk delete users
     */
    public void bulkDeleteUsers(Long[] userIds) {
        List<Long> ids = Arrays.asList(userIds);
        List<User> users = userRepository.findAllById(ids);

        // Check if we're trying to delete all admin users
        long adminUsersToDelete = users.stream()
            .mapToLong(u -> u.getIsAdmin() ? 1 : 0)
            .sum();
        long totalAdmins = userRepository.countByIsAdminTrue();

        if (adminUsersToDelete >= totalAdmins) {
            throw new BadRequestException("Cannot delete all admin users");
        }

        userRepository.deleteAll(users);
    }

    /**
     * Bulk toggle verified status
     */
    public void bulkToggleVerified(Long[] userIds, boolean verified) {
        List<Long> ids = Arrays.asList(userIds);
        List<User> users = userRepository.findAllById(ids);
        for (User user : users) {
            user.setIsVerified(verified);
        }
        userRepository.saveAll(users);
    }
}
