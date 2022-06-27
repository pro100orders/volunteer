package com.pro100user.volunteerbackend.controller;

import com.pro100user.volunteerbackend.annotation.CurrentUser;
import com.pro100user.volunteerbackend.dto.MessageDTO;
import com.pro100user.volunteerbackend.dto.RequestCreateDTO;
import com.pro100user.volunteerbackend.dto.RequestDTO;
import com.pro100user.volunteerbackend.dto.RequestUpdateDTO;
import com.pro100user.volunteerbackend.security.UserSecurity;
import com.pro100user.volunteerbackend.service.RequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("requests")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RequestController {

    private final RequestService requestService;

    @GetMapping
    public List<RequestDTO> requests(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "sort", required = false, defaultValue = "0") Long sort
    ) {
        return requestService.getAll(search, sort)
                .stream()
                .sorted(Comparator.comparing(RequestDTO::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public RequestDTO request(
            @PathVariable("id") Long id
    ) {
        RequestDTO request = requestService.getById(id);
        request.setComments(request.getComments()
                .stream()
                .sorted(Comparator.comparing(MessageDTO::getSentAt).reversed())
                .collect(Collectors.toList()));
        return request;
    }

    @PostMapping
    public RequestDTO create(
            @RequestBody RequestCreateDTO dto,
            @CurrentUser UserSecurity userSecurity
    ) {
        dto.setUserId(userSecurity.getId());
        RequestDTO request = requestService.create(dto);
        return requestService.getById(request.getId());
    }

    @PutMapping
    public RequestDTO update(
            @RequestBody RequestUpdateDTO dto
    ) {
        return requestService.update(dto);
    }

    @DeleteMapping("{id}")
    public boolean delete(
            @PathVariable("id") Long id
    ) {
        return requestService.delete(id);
    }
}
