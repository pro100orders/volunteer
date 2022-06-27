package com.pro100user.volunteerbackend.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    String save(MultipartFile file, Long id);

    boolean update(String filepath, MultipartFile file);

    boolean delete(String filepath);
}
