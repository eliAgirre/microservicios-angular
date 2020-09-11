package com.proyecto.microservicios.app.commons.services;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommonService<E> {
	
	public Iterable<E> findAll();
	
	public Page<E> findAll(Pageable pageable);

	// con optional se puede saber si viene nulo el objeto, si es empty, si la consulta viene vacía... (a partir de la v8 de java)
	public Optional<E> findById(Long id);
	
	public E save(E entity);
	
	public void deleteById(Long id);
	
}
