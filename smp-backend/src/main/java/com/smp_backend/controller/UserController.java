package com.smp_backend.controller;

import com.smp_backend.entity.User;
import com.smp_backend.service.UserService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Signup / Register
    @PostMapping("/signup")
    public String register(@RequestBody User user) {
        User saved = userService.register(user);
        if (saved == null) {
            return "Email already exists";
        }
        return "Registered successfully";
    }

    // Login
    @PostMapping("/login")
    public User login(@RequestBody User req) {
        return userService.login(req.getEmail(), req.getPassword());
    }
    @GetMapping("/all")
    public List<User> getAllUsers() {
    	return userService.getAllUsers();
    }


    // Get user profile
    @GetMapping("/by-email/{email}")
    public User getUser(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    // Get user by ID
    @GetMapping("/by-id/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

}
