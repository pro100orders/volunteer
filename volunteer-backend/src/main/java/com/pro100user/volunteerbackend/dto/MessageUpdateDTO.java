package com.pro100user.volunteerbackend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class MessageUpdateDTO {

    private Long id;

    private String text;
}
