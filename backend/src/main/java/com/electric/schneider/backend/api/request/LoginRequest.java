package com.electric.schneider.backend.api.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
		@Email @NotBlank String correo,
		@NotBlank String password
) {
}
