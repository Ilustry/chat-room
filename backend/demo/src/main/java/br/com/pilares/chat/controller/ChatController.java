package br.com.pilares.chat.controller;

import java.util.Date;
import java.util.Random;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import br.com.pilares.chat.model.Mensagem;

@Controller
public class ChatController {

	private String[] cores = {"red", "green", "blue", "purple", "orange", "yellow"};

	@MessageMapping("/mensagem")
	@SendTo("/chat/mensagens") //notifica todos os inscritos de nova mensagem
	public Mensagem receberMensagem(Mensagem mensagem) {
		mensagem.setData(new Date().getTime());		
		if(mensagem.getTipo().equals("NOVO_USUARIO")) {
			mensagem.setCor(cores[new Random().nextInt(cores.length)]);
			mensagem.setTexto(" - Novo Usuario Conectado");
		}
		
		return mensagem;
	}
	
	@MessageMapping("/escrevendo")
	@SendTo("/chat/escrevendo")
	public String digitando(String username) {
		return username.concat("está escrevendo...");
	}
}
