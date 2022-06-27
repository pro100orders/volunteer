package com.pro100user.volunteerbackend.repository;

import com.pro100user.volunteerbackend.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
}
