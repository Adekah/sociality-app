package com.sociality.ws.user;

import com.fasterxml.jackson.annotation.JsonView;
import com.sociality.ws.shared.Views;
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

    @NotNull(message = "{sociality.constraint.username.NotNull.message}")
    @Size(min = 4, max = 30)
    @UniqueUsername
    @JsonView(Views.Base.class)
    private String username;

    @NotNull
    @Size(min = 4, max = 30)
    @JsonView(Views.Base.class)
    private String displayName;

    @NotNull
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{sociality.constraint.password.Pattern.message}")
    @Size(min = 4, max = 30)
    @JsonView(Views.Sensitive.class)
    private String password;

    @JsonView(Views.Base.class)
    private String image;
}
