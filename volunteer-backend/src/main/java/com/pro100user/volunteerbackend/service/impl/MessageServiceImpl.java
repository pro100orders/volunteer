package com.pro100user.volunteerbackend.service.impl;

import com.pro100user.volunteerbackend.dto.MessageCreateDTO;
import com.pro100user.volunteerbackend.dto.MessageDTO;
import com.pro100user.volunteerbackend.entity.Message;
import com.pro100user.volunteerbackend.entity.Request;
import com.pro100user.volunteerbackend.mapper.MessageMapper;
import com.pro100user.volunteerbackend.repository.MessageRepository;
import com.pro100user.volunteerbackend.repository.RequestRepository;
import com.pro100user.volunteerbackend.repository.UserRepository;
import com.pro100user.volunteerbackend.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper;

    private final UserRepository userRepository;
    private final RequestRepository requestRepository;

    @Override
    public MessageDTO create(MessageCreateDTO dto) {
        Message message = messageMapper.toEntity(dto);
        message.setUser(userRepository.findById(dto.getUserId()).orElseThrow());
        message = messageRepository.save(message);
        Request request = requestRepository.findById(dto.getRequestId()).orElseThrow();
        request.getComments().add(message);
        requestRepository.save(request);
        return messageMapper.toMessageDTO(
                message
        );
    }

    @Override
    public MessageDTO getById(Long messageId) {
        return messageMapper.toMessageDTO(
                messageRepository.findById(messageId).orElseThrow()
        );
    }
}
