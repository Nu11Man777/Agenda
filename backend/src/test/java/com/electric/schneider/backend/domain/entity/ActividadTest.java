package com.electric.schneider.backend.domain.entity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;

class ActividadTest {

	private static Actividad actividad(LocalDateTime inicio, LocalDateTime fin) {
		Actividad actividad = new Actividad();
		actividad.setHoraInicio(inicio);
		actividad.setHoraFin(fin);
		return actividad;
	}

	@Test
	void horasTrabajoForShortActivity() {
		LocalDateTime inicio = LocalDateTime.of(2026, 3, 10, 8, 0);

		assertEquals(new BigDecimal("0.75"), actividad(inicio, inicio.plusMinutes(45)).getHorasTrabajo());
	}

	@Test
	void horasTrabajoForHalfHour() {
		LocalDateTime inicio = LocalDateTime.of(2026, 3, 10, 8, 0);

		assertEquals(BigDecimal.valueOf(0.5), actividad(inicio, inicio.plusMinutes(30)).getHorasTrabajo());
	}

	@Test
	void horasTrabajoSpanningSeveralHours() {
		LocalDateTime inicio = LocalDateTime.of(2026, 3, 10, 9, 0);

		assertEquals(new BigDecimal("2.50"), actividad(inicio, inicio.plusMinutes(150)).getHorasTrabajo());
	}

	@Test
	void horasTrabajoIsNullWithoutSchedule() {
		assertNull(new Actividad().getHorasTrabajo());
	}
}
