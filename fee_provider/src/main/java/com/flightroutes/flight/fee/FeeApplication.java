package com.flightroutes.flight.fee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.ImportResource;
import tk.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan(basePackages = "com.flightroutes.flight.fee.repository")
@ImportResource(value = {"classpath:root.xml"})
public class FeeApplication {
    public static void main(String[] args) {
        SpringApplication.run(FeeApplication.class, args);
    }
}
