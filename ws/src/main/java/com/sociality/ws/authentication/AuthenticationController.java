package com.sociality.ws.authentication;

import com.fasterxml.jackson.annotation.JsonView;
import com.sociality.ws.shared.Views;
import com.sociality.ws.user.User;
import com.sociality.ws.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;


import java.util.Base64;

@RestController
public class AuthenticationController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/api/1.0/authentication")
    @JsonView(Views.Base.class)
    ResponseEntity<?> handleAuthentication(@RequestHeader(name = "Authorization") String authorization) {

        String base64encoded = authorization.split("Basic ")[1];
        String decoded = new String(Base64.getDecoder().decode(base64encoded));
        String[] parts = decoded.split(":");
        String username = parts[0];
        User inDB = userRepository.findByUsername(username);
        return ResponseEntity.ok(inDB);
    }

}
