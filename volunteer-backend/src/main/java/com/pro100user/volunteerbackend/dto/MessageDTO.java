package com.pro100user.volunteerbackend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class MessageDTO {

    private Long id;

    private UserDTO user;

    private String text;

    private LocalDateTime sentAt;
}
