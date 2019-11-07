package com.easy.tom;

import com.tom.common.utils.SpringContextProvider;
import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
@SpringBootApplication
@Import(SpringContextProvider.class)
public class App {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(App.class);
        app.setBannerMode(Banner.Mode.OFF);
        app.run(args);
        System.err.println("tom system started");
    }

    
}
