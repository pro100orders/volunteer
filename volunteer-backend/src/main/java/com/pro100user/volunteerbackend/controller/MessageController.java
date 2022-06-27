package com.pro100user.volunteerbackend.controller;

import com.pro100user.volunteerbackend.annotation.CurrentUser;
import com.pro100user.volunteerbackend.dto.MessageCreateDTO;
import com.pro100user.volunteerbackend.dto.MessageDTO;
import com.pro100user.volunteerbackend.dto.RequestCreateDTO;
import com.pro100user.volunteerbackend.dto.RequestDTO;
import com.pro100user.volunteerbackend.security.UserSecurity;
import com.pro100user.volunteerbackend.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("messages")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public MessageDTO create(
            @RequestBody MessageCreateDTO dto,
            @CurrentUser UserSecurity userSecurity
    ) {
        dto.setUserId(userSecurity.getId());
        MessageDTO message = messageService.create(dto);
        return messageService.getById(message.getId());
    }
}
