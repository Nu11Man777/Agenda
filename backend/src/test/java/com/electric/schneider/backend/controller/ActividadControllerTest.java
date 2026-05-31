package com.electric.schneider.backend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import com.electric.schneider.backend.api.response.ActividadResponse;
import com.electric.schneider.backend.api.response.SuccessResponse;
import com.electric.schneider.backend.exception.GlobalExceptionHandler;
import com.electric.schneider.backend.service.ActividadService;

import jakarta.servlet.http.HttpServletRequest;

@ExtendWith(MockitoExtension.class)
class ActividadControllerTest {

	@Mock
	private ActividadService actividadService;

	@Mock
	private HttpServletRequest httpServletRequest;

	private final GlobalExceptionHandler exceptionHandler = new GlobalExceptionHandler();

	@Test
	void listReturnsActivitiesForAuthenticatedUser() {
		when(httpServletRequest.getAttribute("userId")).thenReturn(1L);
		when(actividadService.listByUsuario(1L)).thenReturn(List.of());

		ActividadController controller = new ActividadController(actividadService);
		ResponseEntity<SuccessResponse<List<ActividadResponse>>> response = dispatch(controller, httpServletRequest);

		assertEquals(200, response.getStatusCode().value());
	}

	/**
	 * Mirrors what the dispatcher servlet does in production: invoke the
	 * controller, and if it throws, delegate to the same
	 * {@link GlobalExceptionHandler} that handles uncaught errors at runtime.
	 */
	private ResponseEntity<SuccessResponse<List<ActividadResponse>>> dispatch(
			ActividadController controller, HttpServletRequest request) {
		try {
			return controller.list(request);
		} catch (Exception ex) {
			@SuppressWarnings("unchecked")
			ResponseEntity<SuccessResponse<List<ActividadResponse>>> errorResponse =
					(ResponseEntity<SuccessResponse<List<ActividadResponse>>>) (ResponseEntity<?>) exceptionHandler.handleGeneric(ex);
			return errorResponse;
		}
	}
}
