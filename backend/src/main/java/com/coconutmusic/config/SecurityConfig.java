package com.coconutmusic.config;

import com.coconutmusic.security.CustomUserDetailsService;
import com.coconutmusic.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

  @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
     http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(AbstractHttpConfigurer::disable)
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(authz -> authz
            // Public endpoints
            .requestMatchers("/", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/music/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/music/*/play").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/categories/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/artists/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/banners/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/playlists/public/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/playlists/*").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/playlists/*/music").permitAll()
            .requestMatchers("/uploads/**").permitAll()
            
            // Admin endpoints
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            
            // User endpoints
            .requestMatchers("/api/user/**").hasRole("USER")
            .requestMatchers("/api/playlists/**").hasRole("USER")

            // All other requests require authentication
            .anyRequest().authenticated()
        );

    http.authenticationProvider(authenticationProvider());
    http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
}

   @Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    // Cho phép tất cả các origin (hoặc bạn có thể thay bằng domain Angular của bạn)
    configuration.setAllowedOriginPatterns(List.of("*"));

    // Cho phép tất cả các method frontend có thể dùng
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

    // Cho phép tất cả các header từ frontend
    configuration.setAllowedHeaders(List.of("*"));

    // Cho phép gửi cookie/token nếu cần
    configuration.setAllowCredentials(true);

    // Thiết lập đường dẫn áp dụng config CORS
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);

    return source;
}

}
