package com.pro100user.volunteerbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class MessageCreateDTO {

    @JsonIgnore
    private Long userId;

    private Long requestId;

    private String text;
}
