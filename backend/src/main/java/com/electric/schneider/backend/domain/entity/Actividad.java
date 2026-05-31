package com.electric.schneider.backend.domain.entity;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.electric.schneider.backend.domain.enums.EstatusActividad;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "ACTIVIDAD", schema = "AGENDA")
public class Actividad {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Setter(AccessLevel.NONE)
	@Column(name = "ID", nullable = false)
	private Long id;

	@Column(name = "NOMBRE", nullable = false, length = 255)
	private String nombre;

	@Column(name = "FECHA", nullable = false)
	private LocalDate fecha;

	@Column(name = "HORA_INICIO", nullable = false)
	private LocalDateTime horaInicio;

	@Column(name = "HORA_FIN", nullable = false)
	private LocalDateTime horaFin;

	@Column(name = "COMENTARIOS", length = 1000)
	private String comentarios;

	@Enumerated(EnumType.STRING)
	@Column(name = "ESTATUS", nullable = false, length = 20)
	private EstatusActividad estatus = EstatusActividad.PENDIENTE;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USUARIO_ID", nullable = false)
	private Usuario usuario;

	@Transient
	public BigDecimal getHorasTrabajo() {
		if (horaInicio == null || horaFin == null) {
			return null;
		}
		long minutes = Duration.between(horaInicio, horaFin).toMinutesPart();
		return BigDecimal.valueOf(minutes)
				.divide(BigDecimal.valueOf(60), 2, RoundingMode.HALF_UP);
	}
}
