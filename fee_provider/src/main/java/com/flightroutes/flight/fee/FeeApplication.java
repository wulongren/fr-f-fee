package com.flightroutes.flight.fee;

import org.apache.dubbo.config.spring.context.annotation.DubboComponentScan;
import org.apache.dubbo.config.spring.context.annotation.EnableDubboConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

@EnableDubboConfig
@SpringBootApplication
@DubboComponentScan("com.flightroutes.flight.fee.service.FrServiceFeeService")
@ImportResource("classpath:root.xml,dubbo/dubbo-expose.xml")
public class FeeApplication {

    public static void main(String[] args) {
        SpringApplication.run(FeeApplication.class, args);
    }

}
