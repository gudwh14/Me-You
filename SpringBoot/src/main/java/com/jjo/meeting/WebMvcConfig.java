package com.jjo.meeting;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/meeting/**")
                .addResourceLocations("file:///Users/jjo/Desktop/MeYou/meeting/");
        registry.addResourceHandler("/profile/**")
                .addResourceLocations("file:///Users/jjo/Desktop/MeYou/profile/");
    }
}