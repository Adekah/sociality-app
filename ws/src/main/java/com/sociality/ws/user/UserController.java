package com.sociality.ws.user;
import com.sociality.ws.shared.GenericResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class UserController {

  public static final Logger log = LoggerFactory.getLogger(UserController.class);
  @Autowired
  UserService userService;

  @PostMapping("api/1.0/users")
    public GenericResponse createUser(@RequestBody User user){

      userService.save(user);
      return new GenericResponse("user Created");
  }

}
