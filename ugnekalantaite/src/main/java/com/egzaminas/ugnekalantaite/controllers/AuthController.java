package com.egzaminas.ugnekalantaite.controllers;

import com.egzaminas.ugnekalantaite.model.dto.UserLoginDTO;
import com.egzaminas.ugnekalantaite.model.dto.UserRegisterDTO;
import com.egzaminas.ugnekalantaite.model.fdto.UserLoginFDTO;
import com.egzaminas.ugnekalantaite.model.fdto.UserRegisterFDTO;
import com.egzaminas.ugnekalantaite.repositories.UserRepository;
import com.egzaminas.ugnekalantaite.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private final UserService userService = new UserService(userRepository);

    @PostMapping(value = "/api/login")
    public ResponseEntity<UserLoginDTO> login(@RequestBody UserLoginFDTO userLoginFDTO) {
        UserLoginDTO loggedUser = userService.authUser(userLoginFDTO);
        if (loggedUser.getToken() == null) {
            return ResponseEntity.badRequest().body(loggedUser);
        }
        return ResponseEntity.ok(loggedUser);
    }

    @PostMapping(value = "/api/register")
    public ResponseEntity<UserRegisterDTO> register(@RequestBody UserRegisterFDTO UserRegisterFDTO) {
        UserRegisterDTO addedUser = userService.registerUser(UserRegisterFDTO);
        if (!addedUser.isSuccess()) {
            return ResponseEntity.badRequest().body(addedUser);
        }
        return ResponseEntity.ok(addedUser);
    }
}
