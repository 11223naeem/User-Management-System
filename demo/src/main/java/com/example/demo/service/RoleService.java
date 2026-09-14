package com.example.demo.service;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoleService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public RoleService(UserRepository userRepository,
                       RoleRepository roleRepository) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Transactional
    public void assignRole(Long userId, Long roleId) {

        // Find user
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));


        // Find selected role
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() ->
                        new RuntimeException("Role not found"));


        // Remove all existing roles
        user.getRoles().clear();

        // IMPORTANT:
        // Force Hibernate to execute DELETE from user_roles
        userRepository.saveAndFlush(user);


        // Add only the selected role
        user.getRoles().add(role);

        // Save the new role
        userRepository.saveAndFlush(user);
    }
}