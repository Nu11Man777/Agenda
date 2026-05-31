package com.electric.schneider.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.electric.schneider.backend.domain.entity.Usuario;

@Service
public class MailService {
	private static final Logger log = LoggerFactory.getLogger(MailService.class);

	private final JavaMailSender mailSender;
	private final String from;

	public MailService(JavaMailSender mailSender, @Value("${spring.mail.from}") String from) {
		this.mailSender = mailSender;
		this.from = from;
	}

	@Async("mailExecutor")
	public void sendWelcomeEmail(Usuario usuario) {
		try {
			SimpleMailMessage msg = new SimpleMailMessage();
			msg.setFrom(from);
			msg.setTo(usuario.getCorreo());
			msg.setSubject("Bienvenido a Agenda!!");
			msg.setText("Hola " + usuario.getNombre() + ",\n\nTu registro fue exitoso.\n\nSaludos.");
			mailSender.send(msg);
		} catch (MailException ex) {
			log.error("No se pudo enviar el correo de bienvenida a {}", usuario.getCorreo(), ex);
		}
	}
}
