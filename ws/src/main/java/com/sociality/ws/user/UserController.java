package com.sociality.ws.user;
import com.sociality.ws.error.ApiError;
import com.sociality.ws.shared.GenericResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
public class UserController {

  public static final Logger log = LoggerFactory.getLogger(UserController.class);
  @Autowired
  UserService userService;

  @PostMapping("api/1.0/users")
    public ResponseEntity<?> createUser(@RequestBody User user){
    String username = user.getUsername();
    if (username ==null ||username.isEmpty()){
      ApiError error = new ApiError(400,"Validation Error","api/1.0/users");
      Map<String,String> validationErrors = new HashMap<>();
      validationErrors.put("username","Username Cannot Be null");
      error.setValidateErrors(validationErrors);
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);

    }
      userService.save(user);
      return  ResponseEntity.ok( new GenericResponse("user Created"));
  }

}
