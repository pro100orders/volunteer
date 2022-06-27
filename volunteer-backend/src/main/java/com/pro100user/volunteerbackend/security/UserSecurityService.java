package com.pro100user.volunteerbackend.security;

import com.pro100user.volunteerbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserSecurityService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserSecurity loadUserByUsername(String email) throws UsernameNotFoundException {
        return UserSecurity.fromUserToCustomUserDetails(userRepository.findByEmail(email).orElseThrow());
    }
}
