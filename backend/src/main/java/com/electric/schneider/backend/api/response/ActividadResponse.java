package com.electric.schneider.backend.api.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.electric.schneider.backend.domain.enums.EstatusActividad;

public record ActividadResponse(
		Long id,
		String nombre,
		LocalDate fecha,
		LocalDateTime horaInicio,
		LocalDateTime horaFin,
		BigDecimal horasTrabajo,
		String comentarios,
		EstatusActividad estatus
) {
}
