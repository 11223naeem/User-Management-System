package com.example.demo.controller;


import com.example.demo.entity.Task;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager")
@CrossOrigin(origins = "http://localhost:5173")
public class ManagerController {

    private final UserRepository userRepository;
    private final TaskService taskService;

    public ManagerController(UserRepository userRepository,
                             TaskService taskService) {

        this.userRepository = userRepository;
        this.taskService = taskService;
    }

    // View all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(
                userRepository.findAll()
        );
    }

    // View all tasks
    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {

        return ResponseEntity.ok(
                taskService.getAllTasks()
        );
    }

    // Assign task to user
    @PostMapping("/tasks/{userId}")
    public ResponseEntity<Task> assignTask(
            @PathVariable Long userId,
            @RequestBody Task task) {

        return ResponseEntity.ok(
                taskService.assignTask(task, userId)
        );
    }
}