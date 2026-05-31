package com.electric.schneider.backend.api.mapper;

import com.electric.schneider.backend.api.request.ActividadRequest;
import com.electric.schneider.backend.api.response.ActividadResponse;
import com.electric.schneider.backend.domain.entity.Actividad;

public final class ActividadMapper {
	private ActividadMapper() {
	}

	public static void applyRequest(Actividad actividad, ActividadRequest request) {
		actividad.setNombre(request.nombre().trim());
		actividad.setFecha(request.fecha());
		actividad.setHoraInicio(request.horaInicio());
		actividad.setHoraFin(request.horaFin());
		actividad.setComentarios(request.comentarios());
		actividad.setEstatus(request.estatus());
	}

	public static ActividadResponse toResponse(Actividad actividad) {
		return new ActividadResponse(
				actividad.getId(),
				actividad.getNombre(),
				actividad.getFecha(),
				actividad.getHoraInicio(),
				actividad.getHoraFin(),
				actividad.getHorasTrabajo(),
				actividad.getComentarios(),
				actividad.getEstatus()
		);
	}
}
