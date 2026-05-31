package com.electric.schneider.backend.service;

import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.electric.schneider.backend.api.request.LoginRequest;
import com.electric.schneider.backend.api.request.RegisterRequest;
import com.electric.schneider.backend.api.response.AuthResponse;
import com.electric.schneider.backend.domain.entity.Usuario;
import com.electric.schneider.backend.exception.BadRequestException;
import com.electric.schneider.backend.exception.UnauthorizedException;
import com.electric.schneider.backend.repository.UsuarioRepository;
import com.electric.schneider.backend.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
	private final UsuarioRepository usuarioRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final MailService mailService;

	public void register(RegisterRequest request) {
		String correo = normalizeEmail(request.correo());
		if (usuarioRepository.existsByCorreo(request.correo().trim())) {
			throw new BadRequestException("El correo ya está registrado");
		}

		Usuario usuario = new Usuario();
		usuario.setNombre(request.nombre().trim());
		usuario.setApellido(request.apellido().trim());
		usuario.setCorreo(correo);
		usuario.setPassword(passwordEncoder.encode(request.password()));

		Usuario saved = usuarioRepository.save(usuario);
		mailService.sendWelcomeEmail(saved);
	}

	public AuthResponse login(LoginRequest request) {
		String correo = normalizeEmail(request.correo());

		Usuario usuario = usuarioRepository.findByCorreo(correo)
				.orElseThrow(() -> new UnauthorizedException("Credenciales inválidas"));

		if (!passwordEncoder.matches(request.password(), usuario.getPassword())) {
			throw new UnauthorizedException("Credenciales inválidas");
		}

		String token = jwtService.generateToken(usuario);

		return new AuthResponse(
				token,
				usuario.getId(),
				usuario.getNombre(),
				usuario.getApellido(),
				usuario.getCorreo()
		);
	}

	private static String normalizeEmail(String correo) {
		return correo.trim().toLowerCase(Locale.ROOT);
	}
}
