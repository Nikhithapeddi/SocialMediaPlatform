package com.smp_backend.repository;

import com.smp_backend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    // Get all posts of a specific user
    List<Post> findByUserId(Long userId);

}
