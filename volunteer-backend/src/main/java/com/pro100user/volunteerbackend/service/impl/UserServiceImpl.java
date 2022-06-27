package com.pro100user.volunteerbackend.service.impl;

import com.pro100user.volunteerbackend.dto.RequestDTO;
import com.pro100user.volunteerbackend.dto.UserCreateDTO;
import com.pro100user.volunteerbackend.dto.UserDTO;
import com.pro100user.volunteerbackend.dto.UserUpdateDTO;
import com.pro100user.volunteerbackend.entity.User;
import com.pro100user.volunteerbackend.entity.enums.Role;
import com.pro100user.volunteerbackend.mapper.RequestMapper;
import com.pro100user.volunteerbackend.mapper.UserMapper;
import com.pro100user.volunteerbackend.repository.RequestRepository;
import com.pro100user.volunteerbackend.repository.UserRepository;
import com.pro100user.volunteerbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    private final RequestRepository requestRepository;
    private final RequestMapper requestMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean create(UserCreateDTO dto) {
        if(userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Ця пошта вже зайнята");
        }
        User entity = userMapper.toEntity(dto);
        entity.setRoles(List.of(Role.ROLE_USER));
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        entity.setEnabled(false);
        userRepository.save(entity);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getById(Long userId) {
        return userMapper.toUserDTO(
                userRepository.findById(userId).orElseThrow()
        );
    }

    @Override
    public UserDTO update(UserUpdateDTO dto) {
        User userDTO = userMapper.toEntity(dto);
        User entity = userRepository.findById(userDTO.getId()).orElseThrow();

        if(!entity.getEmail().equals(userDTO.getEmail()) &&
                userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Ця пошта вже зайнята");
        }
        if(entity.getPhone() != null && !entity.getPhone().equals(userDTO.getPhone()) &&
                userRepository.findByPhone(dto.getPhone()).isPresent()) {
            throw new IllegalArgumentException("Цей номер вже зайнятий");
        }
        if(dto.getNewPassword() != null) {
            if(passwordEncoder.matches(entity.getPassword(), userDTO.getPassword())){
                entity.setPassword(passwordEncoder.encode(dto.getNewPassword()));
            }
        }
        entity = entity.toBuilder()
                .surname(userDTO.getSurname() == null ? entity.getSurname() : userDTO.getSurname())
                .name(userDTO.getName() == null ? entity.getName() : userDTO.getName())
                .email(userDTO.getEmail() == null ? entity.getEmail() : userDTO.getEmail())
                .phone(userDTO.getPhone() == null ? entity.getPhone() : userDTO.getPhone())
                .address(userDTO.getAddress() == null ? entity.getAddress() : userDTO.getAddress())
                .build();
        return userMapper.toUserDTO(
                userRepository.save(entity)
        );
    }

    @Override
    public boolean delete(Long userId) {
        User entity = userRepository.findById(userId).orElseThrow();
        entity.setEnabled(false);
        userRepository.save(entity);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> getAll() {
        return userMapper.toUserDTO(
                userRepository.findAll()
        );
    }


    @Override
    @Transactional(readOnly = true)
    public List<RequestDTO> getRequests(Long userId) {
        return requestMapper.toRequestDTO(
                userRepository.findById(userId).orElseThrow().getRequests()
        );
    }
}
