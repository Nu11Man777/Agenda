package com.electric.schneider.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.electric.schneider.backend.api.mapper.ActividadMapper;
import com.electric.schneider.backend.api.request.ActividadRequest;
import com.electric.schneider.backend.api.response.ActividadResponse;
import com.electric.schneider.backend.domain.entity.Actividad;
import com.electric.schneider.backend.domain.entity.Usuario;
import com.electric.schneider.backend.domain.enums.EstatusActividad;
import com.electric.schneider.backend.exception.BadRequestException;
import com.electric.schneider.backend.exception.NotFoundException;
import com.electric.schneider.backend.repository.ActividadRepository;
import com.electric.schneider.backend.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActividadService {
	private final ActividadRepository actividadRepository;
	private final UsuarioRepository usuarioRepository;

	public List<ActividadResponse> listByUsuario(Long usuarioId) {
		return actividadRepository.findAllByUsuarioId(usuarioId).stream().map(ActividadMapper::toResponse).toList();
	}

	public ActividadResponse getById(Long usuarioId, Long actividadId) {
		Actividad actividad = actividadRepository.findByIdAndUsuarioId(actividadId, usuarioId)
				.orElseThrow(() -> new NotFoundException("Actividad no encontrada"));
		return ActividadMapper.toResponse(actividad);
	}

	public ActividadResponse create(Long usuarioId, ActividadRequest request) {
		validateHoras(request.horaInicio(), request.horaFin());

		Usuario usuario = usuarioRepository.findById(usuarioId)
				.orElseThrow(() -> new NotFoundException("Usuario no encontrado"));

		Actividad actividad = new Actividad();
		ActividadMapper.applyRequest(actividad, request);
		actividad.setUsuario(usuario);
		if (actividad.getEstatus() == null) {
			actividad.setEstatus(EstatusActividad.PENDIENTE);
		}

		Actividad saved = actividadRepository.save(actividad);
		return ActividadMapper.toResponse(saved);
	}

	public ActividadResponse update(Long usuarioId, Long actividadId, ActividadRequest request) {
		validateHoras(request.horaInicio(), request.horaFin());

		Actividad actividad = actividadRepository.findByIdAndUsuarioId(actividadId, usuarioId)
				.orElseThrow(() -> new NotFoundException("Actividad no encontrada"));

		ActividadMapper.applyRequest(actividad, request);
		if (actividad.getEstatus() == null) {
			actividad.setEstatus(EstatusActividad.PENDIENTE);
		}

		Actividad saved = actividadRepository.save(actividad);
		return ActividadMapper.toResponse(saved);
	}

	public void delete(Long usuarioId, Long actividadId) {
		Actividad actividad = actividadRepository.findByIdAndUsuarioId(actividadId, usuarioId)
				.orElseThrow(() -> new NotFoundException("Actividad no encontrada"));
		actividadRepository.delete(actividad);
	}

	private void validateHoras(java.time.LocalDateTime inicio, java.time.LocalDateTime fin) {
		if (inicio == null || fin == null) {
			return;
		}
		if (fin.isBefore(inicio)) {
			throw new BadRequestException("horaFin debe ser posterior a horaInicio");
		}
	}

}
