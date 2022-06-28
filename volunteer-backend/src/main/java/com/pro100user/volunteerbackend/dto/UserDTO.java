package com.pro100user.volunteerbackend.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class UserDTO {

    private Long id;

    private String name;

    private String surname;

    private String email;

    private String phone;

    private String address;

    private String description;

    private boolean enabled;
}
