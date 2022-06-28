package com.pro100user.volunteerbackend.service;

import com.pro100user.volunteerbackend.dto.RequestDTO;
import com.pro100user.volunteerbackend.dto.UserCreateDTO;
import com.pro100user.volunteerbackend.dto.UserDTO;
import com.pro100user.volunteerbackend.dto.UserUpdateDTO;

import java.util.List;

public interface UserService {

    boolean create(UserCreateDTO dto);
    UserDTO getById(Long userId);
    UserDTO update(UserUpdateDTO dto);
    boolean delete(Long userId);
    List<UserDTO> getAll();

    List<RequestDTO> getRequests(Long userId);
    UserDTO toggleUser(Long userId);
}
