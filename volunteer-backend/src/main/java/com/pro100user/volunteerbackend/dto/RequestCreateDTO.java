package com.pro100user.volunteerbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class RequestCreateDTO {

    @JsonIgnore
    private Long userId;

    private String title;

    private String description;

    private String address;

    private boolean request;

    private boolean payment;

    private boolean status;
}
