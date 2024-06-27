package com.egzaminas.ugnekalantaite.runner;

import com.egzaminas.ugnekalantaite.model.entity.Roles;
import com.egzaminas.ugnekalantaite.model.entity.User;
import com.egzaminas.ugnekalantaite.security.BCrypt;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.egzaminas.ugnekalantaite.repositories.UserRepository;

@Slf4j
@Component
@AllArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {


    private final UserRepository userRepository;



    @Override
    public void run(String... args) throws Exception {

        if (userRepository.findByUsername("admin").isEmpty()) {
            User adminUser = new User();
            adminUser.setRoleID(Roles.ADMIN.getRoleId());

            adminUser.setUsername("admin");
            adminUser.setEmail("admin@gmail.com");

            BCrypt bcrypt = new BCrypt();
            adminUser.setPassword(bcrypt.hashPassword("admin"));

            userRepository.save(adminUser);
            log.info("Database initialized");
        }
    }
}
