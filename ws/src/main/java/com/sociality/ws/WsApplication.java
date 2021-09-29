package com.sociality.ws;

import com.sociality.ws.user.User;
import com.sociality.ws.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class WsApplication {

    public static void main(String[] args) {
        SpringApplication.run(WsApplication.class, args);
    }

    @Bean
    CommandLineRunner createInitialUsers(UserService userService) {
        return (args) -> {
                User user = new User();
                user.setUsername("adekah");
                user.setPassword("P4ssword");
                user.setDisplayName("adekah");
                userService.save(user);
        };
    }

/*    ya da ----->

 @Bean
    CommandLineRunner createInitialUsers(UserService userService) {
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
                User user = new User();
                user.setUsername("adekah");
                user.setPassword("P4ssword");
                user.setDisplayName("adekah");
                userService.save(user);
            }
        };
    }*/
}
