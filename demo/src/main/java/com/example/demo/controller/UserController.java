package com.example.demo.controller;

import com.example.demo.entity.Task;
import com.example.demo.entity.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.JwtService;
import com.example.demo.service.TaskService;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final TaskService taskService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    public UserController(
            UserService userService,
            TaskService taskService,
            UserRepository userRepository,
            RoleRepository roleRepository,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {

        this.userService = userService;
        this.taskService = taskService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    // =========================================================
    // LOGIN
    // =========================================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User user) {

        // Validate email
        if (user.getEmail() == null ||
                user.getEmail().trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Email is required");
        }

        // Validate password
        if (user.getPassword() == null ||
                user.getPassword().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Password is required");
        }

        String email =
                user.getEmail()
                        .trim()
                        .toLowerCase();

        try {

            // =================================================
            // SPRING SECURITY AUTHENTICATION
            // =================================================

            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    email,
                                    user.getPassword()
                            )
                    );

            // =================================================
            // GET AUTHENTICATED USER
            // =================================================

            User existingUser =
                    userRepository
                            .findByEmail(email)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "User not found"
                                    )
                            );

            // =================================================
            // GENERATE JWT
            // =================================================

            UserDetails userDetails =
                    (UserDetails)
                            authentication.getPrincipal();

            String token =
                    jwtService.generateToken(
                            userDetails
                    );

            // =================================================
            // RESPONSE
            // =================================================

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "token",
                    token
            );

            response.put(
                    "id",
                    existingUser.getId()
            );

            response.put(
                    "name",
                    existingUser.getName()
            );

            response.put(
                    "email",
                    existingUser.getEmail()
            );

            response.put(
                    "roles",
                    existingUser.getRoles()
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }
    }

    // =========================================================
    // GET OWN PROFILE
    // =========================================================

    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfile(
            @PathVariable Long id) {

        User user =
                userService.getUserById(id);

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "id",
                user.getId()
        );

        response.put(
                "name",
                user.getName()
        );

        response.put(
                "email",
                user.getEmail()
        );

        response.put(
                "roles",
                user.getRoles()
        );

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GET USER TASKS
    // =========================================================

    @GetMapping("/{id}/tasks")
    public ResponseEntity<List<Task>> getMyTasks(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                taskService.getTasksByUser(id)
        );
    }
}