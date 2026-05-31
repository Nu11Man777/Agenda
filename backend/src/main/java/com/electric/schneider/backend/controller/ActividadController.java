package com.electric.schneider.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.electric.schneider.backend.api.request.ActividadRequest;
import com.electric.schneider.backend.api.response.ActividadResponse;
import com.electric.schneider.backend.api.response.SuccessResponse;
import com.electric.schneider.backend.service.ActividadService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActividadController {
	private final ActividadService actividadService;

	@GetMapping
	public ResponseEntity<SuccessResponse<List<ActividadResponse>>> list(HttpServletRequest request) {
		Long userId = (Long) request.getAttribute("userId");
		return ResponseEntity.ok(SuccessResponse.ok("OK", actividadService.listByUsuario(userId)));
	}

	@PostMapping
	public ResponseEntity<SuccessResponse<ActividadResponse>> create(
			HttpServletRequest httpRequest,
			@Valid @RequestBody ActividadRequest request
	) {
		Long userId = (Long) httpRequest.getAttribute("userId");
		return ResponseEntity.ok(SuccessResponse.ok("Actividad creada", actividadService.create(userId, request)));
	}

	@GetMapping("/{id}")
	public ResponseEntity<SuccessResponse<ActividadResponse>> getById(
			HttpServletRequest request,
			@PathVariable Long id
	) {
		Long userId = (Long) request.getAttribute("userId");
		return ResponseEntity.ok(SuccessResponse.ok("OK", actividadService.getById(userId, id)));
	}

	@PutMapping("/{id}")
	public ResponseEntity<SuccessResponse<ActividadResponse>> update(
			HttpServletRequest httpRequest,
			@PathVariable Long id,
			@Valid @RequestBody ActividadRequest request
	) {
		Long userId = (Long) httpRequest.getAttribute("userId");
		return ResponseEntity.ok(SuccessResponse.ok("Actividad actualizada", actividadService.update(userId, id, request)));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<SuccessResponse<Void>> delete(
			HttpServletRequest request,
			@PathVariable Long id
	) {
		Long userId = (Long) request.getAttribute("userId");
		actividadService.delete(userId, id);
		return ResponseEntity.ok(SuccessResponse.<Void>ok("Actividad eliminada", null));
	}
}
