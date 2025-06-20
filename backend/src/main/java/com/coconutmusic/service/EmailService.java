package com.coconutmusic.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.name}")
    private String appName;

    public void sendVerificationEmail(String to, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject("Verify your " + appName + " account");
            message.setText("Please click the following link to verify your account:\n" +
                           "http://localhost:4200/auth/verify?token=" + token + "\n\n" +
                           "This link will expire in 24 hours.\n\n" +
                           "If you didn't create an account, please ignore this email.");

            mailSender.send(message);
            logger.info("Verification email sent to: {}", to);
        } catch (Exception e) {
            logger.error("Failed to send verification email to: {}", to, e);
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

    public void sendPasswordResetEmail(String to, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject("Reset your " + appName + " password");
            message.setText("Please click the following link to reset your password:\n" +
                           "http://localhost:4200/auth/reset-password?token=" + token + "\n\n" +
                           "This link will expire in 1 hour.\n\n" +
                           "If you didn't request a password reset, please ignore this email.");

            mailSender.send(message);
            logger.info("Password reset email sent to: {}", to);
        } catch (Exception e) {
            logger.error("Failed to send password reset email to: {}", to, e);
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }

    public void sendWelcomeEmail(String to, String username) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject("Welcome to " + appName + "!");
            message.setText("Hi " + username + ",\n\n" +
                           "Welcome to " + appName + "! Your account has been successfully verified.\n" +
                           "You can now enjoy unlimited music streaming.\n\n" +
                           "Happy listening!\n\n" +
                           "The " + appName + " Team");

            mailSender.send(message);
            logger.info("Welcome email sent to: {}", to);
        } catch (Exception e) {
            logger.error("Failed to send welcome email to: {}", to, e);
        }
    }
}
