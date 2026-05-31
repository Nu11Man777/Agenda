package com.electric.schneider.backend.security;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.electric.schneider.backend.domain.entity.Usuario;

import java.util.Optional;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {
	private final SecretKey key;
	private final long expirationMs;

	public JwtService(
			@Value("${app.jwt.secret}") String secret,
			@Value("${app.jwt.expiration-ms}") long expirationMs
	) {
		if (secret == null || secret.trim().length() < 32) {
			throw new IllegalStateException("app.jwt.secret debe tener al menos 32 caracteres (HS256)");
		}
		this.key = Keys.hmacShaKeyFor(secret.trim().getBytes(StandardCharsets.UTF_8));
		this.expirationMs = expirationMs;
	}

	public String generateToken(Usuario usuario) {
		Instant now = Instant.now();
		Instant exp = now.plusMillis(expirationMs);

		return Jwts.builder()
				.subject(String.valueOf(usuario.getId()))
				.claim("nombre", usuario.getNombre())
				.claim("apellido", usuario.getApellido())
				.issuedAt(Date.from(now))
				.expiration(Date.from(exp))
				.signWith(key, Jwts.SIG.HS256)
				.compact();
	}

	public Optional<Claims> extractValidClaims(String token) {
		try {
			Claims claims = extractAllClaims(token);
			Date exp = claims.getExpiration();
			if (exp != null && !exp.after(new Date())) {
				return Optional.empty();
			}
			return Optional.of(claims);
		} catch (JwtException | IllegalArgumentException ex) {
			return Optional.empty();
		}
	}

	public Claims extractAllClaims(String token) {
		Jws<Claims> jws = Jwts.parser()
				.verifyWith(key)
				.build()
				.parseSignedClaims(token);
		return jws.getPayload();
	}
}
