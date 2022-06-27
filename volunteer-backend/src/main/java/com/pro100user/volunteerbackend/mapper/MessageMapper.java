package com.pro100user.volunteerbackend.mapper;

import com.pro100user.volunteerbackend.dto.MessageCreateDTO;
import com.pro100user.volunteerbackend.dto.MessageDTO;
import com.pro100user.volunteerbackend.dto.MessageUpdateDTO;
import com.pro100user.volunteerbackend.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(uses = {UserMapper.class})
public interface MessageMapper {

    @Mapping(source = "userId", target = "user.id")
    Message toEntity(MessageCreateDTO dto);

    Message toEntity(MessageUpdateDTO dto);


    MessageDTO toMessageDTO(Message message);

    List<MessageDTO> toMessageDTO(List<Message> messages);
}
