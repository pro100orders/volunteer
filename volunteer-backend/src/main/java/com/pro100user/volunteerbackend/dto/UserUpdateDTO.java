package com.pro100user.volunteerbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class UserUpdateDTO {

    @JsonIgnore
    private Long id;

    @NotNull
    @NotBlank(message = "Name cannot be empty")
    private String name;

    @NotNull
    @NotBlank(message = "Surname cannot be empty")
    private String surname;

    @NotNull
    @Email(message = "Email does not match format")
    @NotBlank(message = "Email cannot be empty")
    private String email;

    @NotNull
    @NotBlank(message = "Phone cannot be empty")
    private String phone;

    private String address;

    @Size(max = 255, message = "Description must be to up 255")
    private String description;

    @NotNull
    @NotBlank(message = "Password cannot be empty")
    @Size(min = 8, max = 64, message = "Password must be between 8 and 64")
    private String password;

    @NotNull
    @NotBlank(message = "New password cannot be empty")
    @Size(min = 8, max = 64, message = "New password must be between 8 and 64")
    private String newPassword;
}
