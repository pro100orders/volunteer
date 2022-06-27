package com.pro100user.volunteerbackend.mapper;

import com.pro100user.volunteerbackend.dto.RequestCreateDTO;
import com.pro100user.volunteerbackend.dto.RequestDTO;
import com.pro100user.volunteerbackend.dto.RequestUpdateDTO;
import com.pro100user.volunteerbackend.entity.Request;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(uses = {UserMapper.class, MessageMapper.class})
public interface RequestMapper {

    @Mapping(source = "userId", target = "user.id")
    Request toEntity(RequestCreateDTO dto);

    Request toEntity(RequestUpdateDTO dto);


    RequestDTO toRequestDTO(Request request);

    List<RequestDTO> toRequestDTO(List<Request> requests);
}
