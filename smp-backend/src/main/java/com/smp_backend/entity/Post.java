package com.smp_backend.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // FK to users table

    private String caption;

    @Column(columnDefinition = "LONGTEXT")
    private String image; // base64 string


    @ElementCollection
    @CollectionTable(name = "post_comments", joinColumns = @JoinColumn(name = "post_id"))
    private List<Comment> comments = new ArrayList<>();

    private int likes = 0;

    // Constructors
    public Post() {}

    public Post(Long userId, String caption, String image, List<Comment> comments, int likes) {
        this.userId = userId;
        this.caption = caption;
        this.image = image;
        this.comments = comments;
        this.likes = likes;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> string) {
        this.comments = string;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }
}
