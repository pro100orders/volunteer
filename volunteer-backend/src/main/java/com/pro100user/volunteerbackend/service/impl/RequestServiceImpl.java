package com.pro100user.volunteerbackend.service.impl;

import com.pro100user.volunteerbackend.dto.RequestCreateDTO;
import com.pro100user.volunteerbackend.dto.RequestDTO;
import com.pro100user.volunteerbackend.dto.RequestUpdateDTO;
import com.pro100user.volunteerbackend.entity.Request;
import com.pro100user.volunteerbackend.mapper.RequestMapper;
import com.pro100user.volunteerbackend.repository.RequestRepository;
import com.pro100user.volunteerbackend.service.RequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;
    private final RequestMapper requestMapper;

    @Override
    public RequestDTO create(RequestCreateDTO dto) {
        Request request = requestMapper.toEntity(dto);
        return requestMapper.toRequestDTO(
                requestRepository.save(request)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public RequestDTO getById(Long requestId) {
        return requestMapper.toRequestDTO(
                requestRepository.findById(requestId).orElseThrow()
        );
    }

    @Override
    public RequestDTO update(RequestUpdateDTO dto) {
        Request request = requestRepository.findById(dto.getId()).orElseThrow();
        request = request.toBuilder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .address(dto.getAddress())
                .payment(dto.isPayment())
                .request(dto.isRequest())
                .status(dto.isStatus())
                .build();
        return requestMapper.toRequestDTO(
                requestRepository.save(request)
        );
    }

    @Override
    public boolean delete(Long requestId) {
        requestRepository.deleteById(requestId);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public List<RequestDTO> getAll(String search, Long sort) {
        List<Request> requests = requestRepository.findAll();
        if(sort == 1) {
            requests = requests.stream()
                    .filter(Request::isRequest)
                    .toList();
        } else if(sort == 2) {
            requests = requests.stream()
                    .filter(request -> !request.isRequest())
                    .toList();
        }
        return requestMapper.toRequestDTO(
                requests.stream()
                        .filter(request -> request.getTitle().contains(search) ||
                                request.getAddress().contains(search) ||
                                request.getDescription().contains(search))
                        .collect(Collectors.toList())
        );
    }
}
