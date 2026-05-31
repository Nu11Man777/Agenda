package com.electric.schneider.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.electric.schneider.backend.api.request.ActividadRequest;
import com.electric.schneider.backend.api.response.ActividadResponse;
import com.electric.schneider.backend.domain.entity.Actividad;
import com.electric.schneider.backend.domain.entity.Usuario;
import com.electric.schneider.backend.domain.enums.EstatusActividad;
import com.electric.schneider.backend.exception.BadRequestException;
import com.electric.schneider.backend.exception.NotFoundException;
import com.electric.schneider.backend.repository.ActividadRepository;
import com.electric.schneider.backend.repository.UsuarioRepository;

@ExtendWith(MockitoExtension.class)
class ActividadServiceTest {

	@Mock
	private ActividadRepository actividadRepository;

	@Mock
	private UsuarioRepository usuarioRepository;

	@InjectMocks
	private ActividadService actividadService;

	private static ActividadRequest request(LocalDateTime inicio, LocalDateTime fin, EstatusActividad estatus) {
		return new ActividadRequest("  Revisión de tablero  ", inicio.toLocalDate(), inicio, fin, null, estatus);
	}

	@Test
	void createDefaultsStatusToPendiente() {
		LocalDateTime inicio = LocalDateTime.of(2026, 3, 10, 9, 0);
		when(usuarioRepository.findById(1L)).thenReturn(Optional.of(new Usuario()));
		when(actividadRepository.save(any(Actividad.class))).thenAnswer(inv -> inv.getArgument(0));

		ActividadResponse response = actividadService.create(1L, request(inicio, inicio.plusHours(1), null));

		assertEquals(EstatusActividad.PENDIENTE, response.estatus());
		assertEquals("Revisión de tablero", response.nombre());
	}

	@Test
	void createRejectsEndBeforeStart() {
		LocalDateTime inicio = LocalDateTime.of(2026, 3, 10, 9, 0);

		assertThrows(BadRequestException.class,
				() -> actividadService.create(1L, request(inicio, inicio.minusMinutes(15), null)));
		verify(actividadRepository, never()).save(any());
	}

	@Test
	void createRejectsZeroDurationActivity() {
		LocalDateTime inicio = LocalDateTime.of(2026, 3, 10, 9, 0);

		assertThrows(BadRequestException.class,
				() -> actividadService.create(1L, request(inicio, inicio, null)));
		verify(actividadRepository, never()).save(any());
	}

	@Test
	void updateFailsWhenActivityBelongsToAnotherUser() {
		LocalDateTime inicio = LocalDateTime.of(2026, 3, 10, 9, 0);
		when(actividadRepository.findByIdAndUsuarioId(5L, 2L)).thenReturn(Optional.empty());

		assertThrows(NotFoundException.class,
				() -> actividadService.update(2L, 5L, request(inicio, inicio.plusHours(2), EstatusActividad.INICIADO)));
	}

	@Test
	void createKeepsRequestDateAndStatus() {
		LocalDateTime inicio = LocalDateTime.of(2026, 4, 1, 14, 0);
		when(usuarioRepository.findById(1L)).thenReturn(Optional.of(new Usuario()));
		when(actividadRepository.save(any(Actividad.class))).thenAnswer(inv -> inv.getArgument(0));

		ActividadResponse response = actividadService.create(1L,
				request(inicio, inicio.plusMinutes(45), EstatusActividad.FINALIZADO));

		assertEquals(LocalDate.of(2026, 4, 1), response.fecha());
		assertEquals(EstatusActividad.FINALIZADO, response.estatus());
	}
}
