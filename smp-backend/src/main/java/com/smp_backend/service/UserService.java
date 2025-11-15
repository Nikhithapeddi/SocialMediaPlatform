package com.smp_backend.service;

import com.smp_backend.entity.User;
import com.smp_backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(User user) {
        User existing = userRepository.findByEmail(user.getEmail());
        if (existing != null) {
            return null;
        }

        // encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user == null) return null;

        // validate password
        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }

        return null;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

}
