package com.smp_backend.controller;

import com.smp_backend.entity.Post;
import com.smp_backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    // Create post
    @PostMapping("/create")
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    // Get all posts (Feed)
    @GetMapping("/all")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // Get posts by user
    @GetMapping("/user/{userId}")
    public List<Post> getUserPosts(@PathVariable Long userId) {
        return postService.getPostsByUser(userId);
    }

    // Like post
    @PostMapping("/{postId}/like")
    public Post likePost(@PathVariable Long postId) {
        return postService.likePost(postId);
    }

    // Add comment
    @PostMapping("/{postId}/comment")
    public Post addComment(@PathVariable Long postId, @RequestBody Map<String, String> body) {

        String username = body.get("username");
        String comment = body.get("comment");

        return postService.addComment(postId, username, comment);
    }
}
