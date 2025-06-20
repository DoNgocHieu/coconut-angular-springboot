package com.coconutmusic.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve music files from static/music directory
        registry.addResourceHandler("/api/music/stream/**")
                .addResourceLocations("classpath:/static/music/")
                .setCachePeriod(3600); // Cache for 1 hour

        // Serve images from static/images directory
        registry.addResourceHandler("/api/images/**")
                .addResourceLocations("classpath:/static/images/")
                .setCachePeriod(3600);
    }
}
