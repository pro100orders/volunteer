package com.pro100user.volunteerbackend.service;

import com.pro100user.volunteerbackend.dto.MessageCreateDTO;
import com.pro100user.volunteerbackend.dto.MessageDTO;

public interface MessageService {

    MessageDTO create(MessageCreateDTO dto);

    MessageDTO getById(Long messageId);
}
