package com.flightroutes.flight.fee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@ImportResource(value = {"classpath:root.xml"})
public class FeeApplication {
    public static void main(String[] args) {
        SpringApplication.run(FeeApplication.class, args);
    }

}
