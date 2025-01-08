package com.api_java.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components())
                .info(swaggerInfo())
                .addSecurityItem(new SecurityRequirement().addList("JWT"));
    }
 
    private Info swaggerInfo() {
        return new Info()
                .title("api-java")
                .description("Springdoc을 사용한 Swagger UI")
                .version("1.0.0");
    }
}