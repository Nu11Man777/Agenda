package com.electric.schneider.backend.api.request;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.electric.schneider.backend.domain.enums.EstatusActividad;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ActividadRequest(
		@NotBlank @Size(max = 255) String nombre,
		@NotNull LocalDate fecha,
		@NotNull LocalDateTime horaInicio,
		@NotNull LocalDateTime horaFin,
		@Size(max = 1000) String comentarios,
		EstatusActividad estatus
) {
}
