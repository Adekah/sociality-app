package com.sociality.ws.user;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue
    private long id;

    @NotNull
    @Size(min = 4, max = 30)
    @UniqueUsername
    private String username;

    @NotNull
    @Size(min = 4, max = 30)
    private String displayName;

    @NotNull
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
    @Size(min = 4, max = 30)
    private String password;

}
