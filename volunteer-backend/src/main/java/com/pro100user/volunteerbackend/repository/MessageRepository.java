package com.pro100user.volunteerbackend.repository;

import com.pro100user.volunteerbackend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
