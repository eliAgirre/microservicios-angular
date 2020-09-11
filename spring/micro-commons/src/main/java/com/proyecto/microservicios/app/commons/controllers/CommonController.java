package com.proyecto.microservicios.app.commons.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.proyecto.microservicios.app.commons.services.CommonService;

//@CrossOrigin({"http://localhost:4200"})
public class CommonController<E, S extends CommonService<E>> {
	
	@Autowired
	protected S service;
	
	@GetMapping
	public ResponseEntity<?> listar(){
		// por debajo se construye un JSON
		return ResponseEntity.ok().body(service.findAll());
	}
	
	@GetMapping("/pagina")
	public ResponseEntity<?> listar(Pageable pageable){
		// por debajo se construye un JSON
		return ResponseEntity.ok().body(service.findAll(pageable));
	}
	
	@GetMapping("/{id}") // cualquier ruta que obtenga el id
	public ResponseEntity<?> ver(@PathVariable Long id){
		
		Optional<E> option = service.findById(id);
		
		if(option.isEmpty()) {
			return ResponseEntity.notFound().build(); // construye la respuesta sin contenido
		}
		
		return ResponseEntity.ok(option.get()); // retorna el objeto alumno
	}
	
	@PostMapping
	public ResponseEntity<?> crear(@Valid @RequestBody E entity, BindingResult result){
		
		if( result.hasErrors() ){
			return this.validar(result);
		}
		
		E entityBd =  service.save(entity);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(entityBd);
	}
	
	@DeleteMapping("/{id}") // cualquier ruta que obtenga el id
	public ResponseEntity<?> eliminar(@PathVariable Long id){
		
		// Primero lo eliminamos
		service.deleteById(id); // retorna un void
		return ResponseEntity.noContent().build(); // 204
		
		
	}
	
	protected ResponseEntity<?> validar(BindingResult result){
		
		Map<String, Object> errores = new HashMap<>();
		
		result.getFieldErrors().forEach(err -> {
			errores.put(err.getField(), 
						"El campo " + err.getField() + " " +  err.getDefaultMessage());
		});
		return ResponseEntity.badRequest().body(errores); // 400 
	}
}
