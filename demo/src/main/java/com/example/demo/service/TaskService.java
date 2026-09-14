package com.example.demo.service;



import com.example.demo.entity.Task;
import com.example.demo.entity.User;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository,
                       UserRepository userRepository) {

        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    // Manager assigns task to user
    public Task assignTask(Task task, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        task.setAssignedUser(user);

        return taskRepository.save(task);
    }

    // Get all tasks
    public List<Task> getAllTasks() {

        return taskRepository.findAll();
    }

    // Get tasks of a particular user
    public List<Task> getTasksByUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return taskRepository.findByAssignedUser(user);
    }
}
