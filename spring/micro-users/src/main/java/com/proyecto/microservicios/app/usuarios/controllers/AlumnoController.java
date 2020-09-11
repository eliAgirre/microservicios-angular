package com.proyecto.microservicios.app.usuarios.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.proyecto.microservicios.app.commons.controllers.CommonController;
import com.proyecto.microservicios.app.usuarios.services.AlumnoService;
import com.proyecto.microservicios.commons.alumnos.models.entity.Alumno;

@RestController
public class AlumnoController extends CommonController<Alumno, AlumnoService>{
	
	@GetMapping("/alumnos-por-curso")
	public ResponseEntity<?> getAlumnoXcurso(@RequestParam List<Long> ids){
	    return ResponseEntity.ok(service.findAllById(ids));
	}

	
	@PutMapping("/{id}") // cualquier ruta que obtenga el id
	public ResponseEntity<?> editar(@Valid @RequestBody Alumno alumno, BindingResult result, @PathVariable Long id){
		
		if( result.hasErrors() ){
			return this.validar(result);
		}
		
		Optional<Alumno> option = service.findById(id);
		
		// valiadamos que no exista
		if(option.isEmpty()) {
			return ResponseEntity.notFound().build(); // construye la respuesta sin contenido
		}
		
		Alumno alumnoBd = option.get();
		// solo se modifican algunos datosS
		alumnoBd.setNombre(alumno.getNombre());
		alumnoBd.setApellido(alumno.getApellido());
		alumnoBd.setEmail(alumno.getEmail());
		
		// created 201
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(alumnoBd)); // se periste con el save y luego se pasa al cuerpo de la respuesta
		
	}
	
	@GetMapping("/buscar/{texto}")
	public ResponseEntity<?> buscar(@PathVariable String texto){
		
		return ResponseEntity.ok(service.findByNombreOrApellido(texto));
	}

	@PostMapping("/crear-con-foto")
	public ResponseEntity<?> crearConFoto(@Valid Alumno alumno, BindingResult result,
		@RequestParam MultipartFile archivo) throws IOException {

		// valida si viene el archivo
		if( !archivo.isEmpty() ) {
			alumno.setFoto(archivo.getBytes());
		}
		
		return super.crear(alumno, result);
	}
	
	@PutMapping("/editar-con-foto/{id}") // cualquier ruta que obtenga el id
	public ResponseEntity<?> editarConFoto(@Valid Alumno alumno, 
			BindingResult result, @PathVariable Long id, @RequestParam MultipartFile archivo) throws IOException{
		
		if( result.hasErrors() ){
			return this.validar(result);
		}
		
		Optional<Alumno> option = service.findById(id);
		
		// valiadamos que no exista
		if(option.isEmpty()) {
			return ResponseEntity.notFound().build(); // construye la respuesta sin contenido
		}
		
		Alumno alumnoBd = option.get();
		// solo se modifican algunos datosS
		alumnoBd.setNombre(alumno.getNombre());
		alumnoBd.setApellido(alumno.getApellido());
		alumnoBd.setEmail(alumno.getEmail());
		
		// valida si viene el archivo
		if( !archivo.isEmpty() ) {
			alumnoBd.setFoto(archivo.getBytes());
		}
		
		// created 201
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(alumnoBd)); // se periste con el save y luego se pasa al cuerpo de la respuesta
		
	}
	
	@GetMapping("/uploads/img/{id}")
	public ResponseEntity<?> verFoto(@PathVariable Long id){
		
		Optional<Alumno> option = service.findById(id);
		
		if( option.isEmpty()  || option.get().getFoto() == null ){ // si la foto es null
			return ResponseEntity.notFound().build();
		}
		
		Resource imagen = new ByteArrayResource(option.get().getFoto());
		
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imagen);
	}
	
}
