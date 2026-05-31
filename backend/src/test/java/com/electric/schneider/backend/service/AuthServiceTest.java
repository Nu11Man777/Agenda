package com.electric.schneider.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.electric.schneider.backend.api.request.LoginRequest;
import com.electric.schneider.backend.api.request.RegisterRequest;
import com.electric.schneider.backend.domain.entity.Usuario;
import com.electric.schneider.backend.exception.BadRequestException;
import com.electric.schneider.backend.exception.UnauthorizedException;
import com.electric.schneider.backend.repository.UsuarioRepository;
import com.electric.schneider.backend.security.JwtService;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

	@Mock
	private UsuarioRepository usuarioRepository;

	@Mock
	private PasswordEncoder passwordEncoder;

	@Mock
	private JwtService jwtService;

	@Mock
	private MailService mailService;

	@InjectMocks
	private AuthService authService;

	@Test
	void registerStoresNormalizedEmailAndEncodedPassword() {
		when(usuarioRepository.existsByCorreo("ana.lopez@mail.com")).thenReturn(false);
		when(passwordEncoder.encode("secreto123")).thenReturn("{hash}");
		when(usuarioRepository.save(any(Usuario.class))).thenAnswer(inv -> inv.getArgument(0));

		authService.register(new RegisterRequest(" Ana ", " López ", "ana.lopez@mail.com", "secreto123"));

		ArgumentCaptor<Usuario> captor = ArgumentCaptor.forClass(Usuario.class);
		verify(usuarioRepository).save(captor.capture());
		assertEquals("Ana", captor.getValue().getNombre());
		assertEquals("ana.lopez@mail.com", captor.getValue().getCorreo());
		assertEquals("{hash}", captor.getValue().getPassword());
		verify(mailService).sendWelcomeEmail(captor.getValue());
	}

	@Test
	void registerRejectsDuplicateEmailRegardlessOfCase() {
		when(usuarioRepository.existsByCorreo("ana.lopez@mail.com")).thenReturn(true);

		assertThrows(BadRequestException.class,
				() -> authService.register(new RegisterRequest("Ana", "López", " Ana.Lopez@Mail.com", "secreto123")));
		verify(usuarioRepository, never()).save(any());
	}

	@Test
	void loginFailsWithWrongPassword() {
		Usuario usuario = new Usuario();
		usuario.setCorreo("ana.lopez@mail.com");
		usuario.setPassword("{hash}");
		when(usuarioRepository.findByCorreo("ana.lopez@mail.com")).thenReturn(Optional.of(usuario));
		when(passwordEncoder.matches("incorrecta", "{hash}")).thenReturn(false);

		assertThrows(UnauthorizedException.class,
				() -> authService.login(new LoginRequest("ana.lopez@mail.com", "incorrecta")));
	}
}
