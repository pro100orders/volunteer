package com.pro100user.volunteerbackend.controller;

import com.pro100user.volunteerbackend.annotation.CurrentUser;
import com.pro100user.volunteerbackend.dto.RequestDTO;
import com.pro100user.volunteerbackend.dto.UserDTO;
import com.pro100user.volunteerbackend.dto.UserUpdateDTO;
import com.pro100user.volunteerbackend.security.UserSecurity;
import com.pro100user.volunteerbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("user")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

    private final UserService userService;

    @GetMapping
    public UserDTO profile(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.getById(userSecurity.getId());
    }

    @PutMapping
    public UserDTO update(
            @RequestBody UserUpdateDTO dto,
            @CurrentUser UserSecurity userSecurity
    ) {
        dto.setId(userSecurity.getId());
        return userService.update(dto);
    }

    @DeleteMapping
    public boolean delete(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.delete(userSecurity.getId());
    }

    @GetMapping("/requests")
    public List<RequestDTO> requests(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.getRequests(userSecurity.getId())
                .stream()
                .sorted(Comparator.comparing(RequestDTO::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public UserDTO profile(
            @PathVariable("id") Long userId
    ) {
        return userService.getById(userId);
    }

    @GetMapping("{id}/requests")
    public List<RequestDTO> requests(
            @PathVariable("id") Long userId
    ) {
        return userService.getRequests(userId)
                .stream()
                .sorted(Comparator.comparing(RequestDTO::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }
}
