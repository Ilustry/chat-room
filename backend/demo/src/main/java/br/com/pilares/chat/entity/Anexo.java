package br.com.pilares.chat.entity;

import java.time.LocalDate;
import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Lob;

@Entity
public class Anexo {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
	private String nome;
	private String tipo;
	private LocalDate date = LocalDate.now();
	private Boolean assinado;
	private LocalDate dateDelete;
	@Lob
    private byte[] dados;

	public Anexo(String nome, String tipo, byte[] dados) {
		this.nome = nome;
		this.tipo = tipo;
		this.dados = dados;
	}
	
	public Anexo() {
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Boolean getAssinado() {
		return assinado;
	}

	public void setAssinado(Boolean assinado) {
		this.assinado = assinado;
	}

	public LocalDate getDateDelete() {
		return dateDelete;
	}

	public void setDateDelete(LocalDate dateDelete) {
		this.dateDelete = dateDelete;
	}

	public byte[] getDados() {
		return dados;
	}

	public void setDados(byte[] dados) {
		this.dados = dados;
	}
	
	
		
}
