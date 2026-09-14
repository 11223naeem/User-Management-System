package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // =========================================================
    // CONVERT EXISTING PLAIN-TEXT PASSWORDS TO BCRYPT
    // =========================================================

    @PostConstruct
    public void migrateExistingPasswords() {

        List<User> users =
                userRepository.findAll();

        boolean changed = false;

        for (User user : users) {

            String password =
                    user.getPassword();

            if (password != null &&
                    !password.startsWith("$2a$") &&
                    !password.startsWith("$2b$") &&
                    !password.startsWith("$2y$")) {

                user.setPassword(
                        passwordEncoder.encode(password)
                );

                changed = true;
            }
        }

        if (changed) {

            userRepository.saveAll(users);

            System.out.println(
                    "Existing passwords converted to BCrypt."
            );
        }
    }

    // =========================================================
    // CREATE USER
    // =========================================================

    public User createUser(User user) {

        String email =
                user.getEmail()
                        .trim()
                        .toLowerCase();

        if (userRepository.existsByEmail(email)) {

            throw new RuntimeException(
                    "Email already exists"
            );
        }

        user.setEmail(email);

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        return userRepository.save(user);
    }

    // =========================================================
    // GET ALL USERS
    // =========================================================

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    // =========================================================
    // GET USER BY ID
    // =========================================================

    public User getUserById(Long id) {

        return userRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );
    }

    // =========================================================
    // UPDATE USER
    // =========================================================

    public User updateUser(
            Long id,
            User updatedUser) {

        User existingUser =
                userRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        existingUser.setName(
                updatedUser.getName()
        );

        String email =
                updatedUser.getEmail()
                        .trim()
                        .toLowerCase();

        existingUser.setEmail(email);

        if (updatedUser.getPassword() != null &&
                !updatedUser.getPassword().isBlank()) {

            existingUser.setPassword(
                    passwordEncoder.encode(
                            updatedUser.getPassword()
                    )
            );
        }

        return userRepository.save(
                existingUser
        );
    }

    // =========================================================
    // DELETE USER
    // =========================================================

    public void deleteUser(Long id) {

        User user =
                userRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        userRepository.delete(user);
    }
}