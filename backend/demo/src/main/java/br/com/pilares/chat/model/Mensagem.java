package br.com.pilares.chat.model;

import java.io.Serializable;

public class Mensagem implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private String texto;
	private Long data;
	private String username;
	private String tipo;
	private String cor;
	
	public Mensagem() {
		// TODO Auto-generated constructor stub
	}
	
	public Mensagem(String texto, String tipo, Long data) {
		this.texto = texto;
		this.tipo = tipo;
		this.data = data;
	}	
	
	public String getTexto() {
		return texto;
	}
	public void setTexto(String texto) {
		this.texto = texto;
	}
	public Long getData() {
		return data;
	}
	public void setData(Long data) {
		this.data = data;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public String getCor() {
		return cor;
	}
	public void setCor(String cor) {
		this.cor = cor;
	}

}
