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
    private String appName;    public void sendVerificationEmail(String to, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject("Verify your " + appName + " account");

            String emailBody = buildVerificationEmailBody(token);
            message.setText(emailBody);

            mailSender.send(message);
            logger.info("Verification email sent to: {}", to);
        } catch (Exception e) {
            logger.error("Failed to send verification email to: {}", to, e);
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

    private String buildVerificationEmailBody(String token) {
        return "🎵 Welcome to " + appName + "! 🎵\n\n" +
               "Thank you for registering with us. To complete your registration and start enjoying unlimited music streaming, " +
               "please verify your email address by clicking the link below:\n\n" +
               "🔗 Verification Link:\n" +
               "http://localhost:4200/auth/verify?token=" + token + "\n\n" +
               "⏰ This verification link will expire in 24 hours for security reasons.\n\n" +
               "🔒 If you didn't create an account with " + appName + ", please ignore this email. " +
               "Your email address will not be used without verification.\n\n" +
               "Need help? Contact our support team.\n\n" +
               "Happy listening! 🎶\n" +
               "The " + appName + " Team";
    }    public void sendPasswordResetEmail(String to, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject("Reset your " + appName + " password");

            String emailBody = buildPasswordResetEmailBody(token);
            message.setText(emailBody);

            mailSender.send(message);
            logger.info("Password reset email sent to: {}", to);
        } catch (Exception e) {
            logger.error("Failed to send password reset email to: {}", to, e);
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }

    private String buildPasswordResetEmailBody(String token) {
        return "🔒 " + appName + " Password Reset Request\n\n" +
               "We received a request to reset your password. If you made this request, " +
               "please click the link below to create a new password:\n\n" +
               "🔗 Reset Password Link:\n" +
               "http://localhost:4200/auth/reset-password?token=" + token + "\n\n" +
               "⏰ This reset link will expire in 1 hour for security reasons.\n\n" +
               "🛡️ If you didn't request a password reset, please ignore this email. " +
               "Your password will remain unchanged and your account is still secure.\n\n" +
               "For additional security, consider:\n" +
               "• Using a strong, unique password\n" +
               "• Keeping your account information updated\n\n" +
               "Need help? Contact our support team.\n\n" +
               "Stay secure! 🔐\n" +
               "The " + appName + " Team";
    }    public void sendWelcomeEmail(String to, String username) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject("🎉 Welcome to " + appName + "!");

            String emailBody = buildWelcomeEmailBody(username);
            message.setText(emailBody);

            mailSender.send(message);
            logger.info("Welcome email sent to: {}", to);
        } catch (Exception e) {
            logger.error("Failed to send welcome email to: {}", to, e);
        }
    }

    private String buildWelcomeEmailBody(String username) {
        return "🎵 Welcome to " + appName + ", " + username + "! 🎵\n\n" +
               "🎉 Congratulations! Your account has been successfully verified.\n\n" +
               "You now have access to:\n" +
               "🎶 Unlimited music streaming\n" +
               "📱 Your personal playlists\n" +
               "❤️ Favorite songs collection\n" +
               "🔍 Discover new music\n" +
               "📊 Recently played tracks\n\n" +
               "🚀 Ready to start your musical journey? Log in now:\n" +
               "http://localhost:4200/auth/login\n\n" +
               "💡 Pro Tips:\n" +
               "• Create playlists for different moods\n" +
               "• Use the search feature to find your favorite artists\n" +
               "• Check out our trending music section\n\n" +
               "Need help getting started? Contact our support team.\n\n" +
               "Happy listening! 🎶\n" +
               "The " + appName + " Team\n\n" +
               "P.S. Follow us on social media for the latest music updates! 📱";
    }
}
