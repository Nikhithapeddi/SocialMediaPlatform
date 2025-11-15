package com.smp_backend.service;

import com.smp_backend.entity.Comment;
import com.smp_backend.entity.Post;
import com.smp_backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // Create Post
    public Post createPost(Post post) {
        post.setLikes(0);  // empty comments initially
        return postRepository.save(post);
    }

    // Get all posts (for Feed)
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Get all posts of a specific user
    public List<Post> getPostsByUser(Long userId) {
        return postRepository.findByUserId(userId);
    }

    // Like a post
    public Post likePost(Long postId) {
        Post p = postRepository.findById(postId).orElse(null);
        if (p == null) return null;

        p.setLikes(p.getLikes() + 1);
        return postRepository.save(p);
    }

    // Add comment to post
    public Post addComment(Long postId, String username, String commentText) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) return null;

        Comment c = new Comment();
        c.setUsername(username);
        c.setComment(commentText);

        post.getComments().add(c);
        return postRepository.save(post);
    }

    // Get post by ID (optional)
    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }
}
