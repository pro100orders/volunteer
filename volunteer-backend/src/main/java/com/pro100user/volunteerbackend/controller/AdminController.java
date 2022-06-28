package com.pro100user.volunteerbackend.controller;

import com.pro100user.volunteerbackend.annotation.CurrentUser;
import com.pro100user.volunteerbackend.dto.UserDTO;
import com.pro100user.volunteerbackend.security.UserSecurity;
import com.pro100user.volunteerbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("admin")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AdminController {

    private final UserService userService;

    @GetMapping("/users")
    public List<UserDTO> users() {
        return userService.getAll();
    }

    @PostMapping("/users/{id}")
    public UserDTO toggleUser(
            @PathVariable("id") Long userId
    ) {
        return userService.toggleUser(userId);
    }
}
