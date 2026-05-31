package com.electric.schneider.backend.api.response;

public record AuthResponse(
		String token,
		Long userId,
		String nombre,
		String apellido,
		String correo
) {
}
