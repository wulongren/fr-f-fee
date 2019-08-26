package com.flightroutes.flight.fee.controller.interceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
/**
 * web mvc config
 *
 */
@Configuration
public class WebMvcConfig implements  WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations("classpath:/resources/static/**");
        registry.addResourceHandler("/**").addResourceLocations("classpath:/resources/public/**/");
    }

}