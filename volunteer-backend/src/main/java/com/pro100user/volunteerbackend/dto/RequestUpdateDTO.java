package com.pro100user.volunteerbackend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class RequestUpdateDTO {

    private Long id;

    private String title;

    private String description;

    private String address;

    private boolean request;

    private boolean payment;

    private boolean status;
}
