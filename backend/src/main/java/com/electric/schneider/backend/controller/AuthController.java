package com.electric.schneider.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.electric.schneider.backend.api.request.LoginRequest;
import com.electric.schneider.backend.api.request.RegisterRequest;
import com.electric.schneider.backend.api.response.AuthResponse;
import com.electric.schneider.backend.api.response.SuccessResponse;
import com.electric.schneider.backend.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
	private final AuthService authService;

	@PostMapping("/register")
	public ResponseEntity<SuccessResponse<Void>> register(@Valid @RequestBody RegisterRequest request) {
		authService.register(request);
		return ResponseEntity.ok(SuccessResponse.<Void>ok("Usuario registrado correctamente", null));
	}

	@PostMapping("/login")
	public ResponseEntity<SuccessResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
		AuthResponse data = authService.login(request);
		return ResponseEntity.ok(SuccessResponse.ok("Login exitoso", data));
	}
}
