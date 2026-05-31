package com.electric.schneider.backend.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.electric.schneider.backend.domain.entity.Usuario;

import io.jsonwebtoken.Claims;

class JwtServiceTest {

	private static final String SECRET = "agenda-unit-test-signing-secret";

	private JwtService jwtService;

	@BeforeEach
	void setUp() {
		jwtService = new JwtService(SECRET, 60_000);
	}

	@Test
	void generatedTokenCarriesUserClaims() {
		Usuario usuario = new Usuario();
		usuario.setNombre("Ana");
		usuario.setApellido("López");

		Optional<Claims> claims = jwtService.extractValidClaims(jwtService.generateToken(usuario));

		assertTrue(claims.isPresent());
		assertEquals("Ana", claims.get().get("nombre", String.class));
		assertEquals("López", claims.get().get("apellido", String.class));
	}

	@Test
	void tamperedTokenIsRejected() {
		String token = jwtService.generateToken(new Usuario());
		String tampered = token.substring(0, token.length() - 4) + "AAAA";

		assertTrue(jwtService.extractValidClaims(tampered).isEmpty());
	}
}
