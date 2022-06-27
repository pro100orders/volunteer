package com.pro100user.volunteerbackend.service;

import com.pro100user.volunteerbackend.dto.*;

import java.util.List;

public interface RequestService {

    RequestDTO create(RequestCreateDTO dto);
    RequestDTO getById(Long requestId);
    RequestDTO update(RequestUpdateDTO dto);
    boolean delete(Long requestId);
    List<RequestDTO> getAll(String search, Long sort);
}
