package com.sociality.ws.authentication;

import com.sociality.ws.error.ApiError;
import com.sociality.ws.user.User;
import com.sociality.ws.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Null;
import java.util.Base64;

@RestController
public class AuthenticationController {

    @Autowired
    UserRepository userRepository;


    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/api/1.0/authentication")
    ResponseEntity<?> handleAuthentication(@RequestHeader(name = "Authorization") String authorization) {

        if (authorization == null) {
            ApiError error = new ApiError(401, "Unauthoriced Request", "/api/1.0/authentication");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
        String base64encoded = authorization.split("Basic ")[1];
        String decoded = new String(Base64.getDecoder().decode(base64encoded));
        String[] parts = decoded.split(":");
        String username = parts[0];
        String password = parts[1];
        User inDB = userRepository.findByUsername(username);
        if (inDB == null) {
            ApiError error = new ApiError(401, "Unauthoriced Request", "/api/1.0/authentication");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
        String hashedPassword = inDB.getPassword();
        if (!passwordEncoder.matches(password, hashedPassword)) {
            ApiError error = new ApiError(401, "Unauthoriced Request", "/api/1.0/authentication");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
        return ResponseEntity.ok().build();
    }

}
