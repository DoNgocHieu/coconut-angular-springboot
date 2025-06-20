package com.coconutmusic.repository;

import com.coconutmusic.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Optional<User> findByVerifyToken(String verifyToken);

    Optional<User> findByForgotPasswordToken(String forgotPasswordToken);

    @Query("SELECT u FROM User u WHERE u.forgotPasswordToken = :token AND u.forgotPasswordTokenExpiry > :now")
    Optional<User> findByValidForgotPasswordToken(@Param("token") String token, @Param("now") LocalDateTime now);

    @Query("SELECT u FROM User u WHERE u.verifyToken = :token AND u.verifyTokenExpiry > :now")
    Optional<User> findByValidVerifyToken(@Param("token") String token, @Param("now") LocalDateTime now);

    @Query("SELECT COUNT(u) FROM User u WHERE u.isAdmin = false")
    Long countNormalUsers();

    @Query("SELECT COUNT(u) FROM User u WHERE u.isVerified = true")
    Long countVerifiedUsers();
}
