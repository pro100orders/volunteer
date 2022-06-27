package com.pro100user.volunteerbackend.mapper;

import com.pro100user.volunteerbackend.dto.UserCreateDTO;
import com.pro100user.volunteerbackend.dto.UserDTO;
import com.pro100user.volunteerbackend.dto.UserUpdateDTO;
import com.pro100user.volunteerbackend.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    User toEntity(UserCreateDTO dto);

    User toEntity(UserUpdateDTO dto);


    UserDTO toUserDTO(User user);

    List<UserDTO> toUserDTO(List<User> users);

}
