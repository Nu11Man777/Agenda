package com.electric.schneider.backend.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "USUARIO", schema = "AGENDA")
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Setter(AccessLevel.NONE)
	@Column(name = "ID", nullable = false)
	private Long id;

	@Column(name = "NOMBRE", nullable = false, length = 100)
	private String nombre;

	@Column(name = "APELLIDO", nullable = false, length = 100)
	private String apellido;

	@Column(name = "CORREO", nullable = false, unique = true, length = 255)
	private String correo;

	@Column(name = "PASSWORD", nullable = false, length = 255)
	private String password;
}
