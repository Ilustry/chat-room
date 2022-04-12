package br.com.pilares.chat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.pilares.chat.model.dto.AnexoDto;
import br.com.pilares.chat.service.AnexoService;

@RestController
@RequestMapping("/anexos")
public class AnexoController {
	
	@Autowired
	private AnexoService as;
	
	@PostMapping
	public ResponseEntity<List<AnexoDto>> criarAnexos(@RequestBody MultipartFile[] files){
		return as.criarAnexos(files);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ByteArrayResource> listPorId(@PathVariable Long id){
		return as.download(id);
	}
	
}
