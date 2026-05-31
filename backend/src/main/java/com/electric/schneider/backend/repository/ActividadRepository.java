package com.electric.schneider.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.electric.schneider.backend.domain.entity.Actividad;

public interface ActividadRepository extends JpaRepository<Actividad, Long> {
	List<Actividad> findAllByUsuarioId(Long usuarioId);

	Optional<Actividad> findByIdAndUsuarioId(Long id, Long usuarioId);
}
