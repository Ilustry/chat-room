package br.com.pilares.chat.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import br.com.pilares.chat.controller.ChatController;
import br.com.pilares.chat.entity.Anexo;
import br.com.pilares.chat.model.Mensagem;
import br.com.pilares.chat.model.dto.AnexoDto;
import br.com.pilares.chat.repository.AnexoRepository;

@Service
public class AnexoService {
	
	@Autowired
	private AnexoRepository ar;
	
	@Autowired
	private ChatController cc;
	
	public ResponseEntity<List<AnexoDto>> criarAnexos(MultipartFile[] files) {
		List<AnexoDto> anexos = new ArrayList<AnexoDto>();
		for(MultipartFile file : files) {
			anexos.add(this.save(file));
			
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(anexos);
	}
	
	public AnexoDto save(MultipartFile file) {
		try {
			this.cc.receberMensagem(new Mensagem(file.getOriginalFilename(), "MENSAGEM", new Date().getTime()));
			System.out.println(file);
			return new AnexoDto(ar.save(new Anexo(file.getOriginalFilename(), file.getContentType(), file.getBytes())));
		}catch (Exception e) {
			return null;
		}
	}

	public ResponseEntity<ByteArrayResource> download(Long id) {
		Anexo anexo = porId(id);
		
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(anexo.getTipo()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename= "+anexo.getNome())
				.body(new ByteArrayResource(anexo.getDados()));
	}
	
	public Anexo porId(Long id) {
		return ar.findById(id).get();
	}
	
}
