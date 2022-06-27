package com.pro100user.volunteerbackend.controller;

import com.pro100user.volunteerbackend.dto.AuthenticationDTO;
import com.pro100user.volunteerbackend.dto.UserCreateDTO;
import com.pro100user.volunteerbackend.repository.UserRepository;
import com.pro100user.volunteerbackend.security.UserSecurity;
import com.pro100user.volunteerbackend.security.jwt.JwtProvider;
import com.pro100user.volunteerbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AuthorizationController {

    private final UserRepository userRepository;
    private final UserService userService;

    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/registration")
    public ResponseEntity<Void> registration(
            @Valid @RequestBody UserCreateDTO dto
    ) {
        userService.create(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @Valid @RequestBody AuthenticationDTO dto
    ) {
        UserSecurity user = (UserSecurity) authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()))
                .getPrincipal();

        if(!userRepository.findByEmail(user.getEmail()).orElseThrow().isEnabled()) {
            throw new IllegalArgumentException("Акаунт не активований! Дочейкайтесь коли ваш профіль підтвердять!");
        }
        return ResponseEntity.ok(jwtProvider.generateToken(user));
    }
}
