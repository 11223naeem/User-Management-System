package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.RoleService;
import com.example.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

   private final UserService userService;
private final RoleService roleService;

public AdminController(UserService userService,
                       RoleService roleService) {

    this.userService = userService;
    this.roleService = roleService;
}

    // CREATE USER
    @PostMapping
    public ResponseEntity<User> createUser(
            @RequestBody User user) {

        User savedUser = userService.createUser(user);

        return ResponseEntity.ok(savedUser);
    }

    // GET ALL USERS
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }

    // GET USER BY ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                userService.getUserById(id)
        );
    }

    // UPDATE USER
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody User user) {

        return ResponseEntity.ok(
                userService.updateUser(id, user)
        );
    }

    // DELETE USER
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok(
                "User deleted successfully"
        );
    }


    @PostMapping("/{userId}/roles/{roleId}")
public ResponseEntity<String> assignRole(
        @PathVariable Long userId,
        @PathVariable Long roleId) {

    roleService.assignRole(userId, roleId);

    return ResponseEntity.ok(
            "Role assigned successfully"
    );
}
}
