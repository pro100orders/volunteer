package com.pro100user.volunteerbackend.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class RequestDTO {

    private Long id;

    private UserDTO user;

    private String title;

    private String description;

    private String address;

    private boolean request;

    private boolean payment;

    private boolean status;

    private LocalDateTime createdAt;

    private List<MessageDTO> comments;
}
