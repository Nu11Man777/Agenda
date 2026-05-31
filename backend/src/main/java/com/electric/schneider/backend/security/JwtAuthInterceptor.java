package com.electric.schneider.backend.security;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.electric.schneider.backend.exception.UnauthorizedException;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthInterceptor implements HandlerInterceptor {
	private final JwtService jwtService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
		if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
			return true;
		}

		String authHeader = request.getHeader("Authorization");
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			throw new UnauthorizedException("No autorizado");
		}

		String token = authHeader.substring(7);
		Claims claims = jwtService.extractValidClaims(token)
				.orElseThrow(() -> new UnauthorizedException("No autorizado"));

		String subject = claims.getSubject();
		if (subject == null || subject.isBlank()) {
			throw new UnauthorizedException("No autorizado");
		}

		Long userId;
		try {
			userId = Long.valueOf(subject);
		} catch (NumberFormatException ex) {
			throw new UnauthorizedException("No autorizado");
		}

		request.setAttribute("userId", userId);
		return true;
	}
}
