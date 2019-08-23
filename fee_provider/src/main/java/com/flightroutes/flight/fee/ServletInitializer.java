package com.flightroutes.flight.fee;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * Description :
 *
 * @author : lei.wang
 * @version : V1.0
 * @date : 2019/8/23
 */
public class ServletInitializer extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(FeeApplication.class);
    }
}
