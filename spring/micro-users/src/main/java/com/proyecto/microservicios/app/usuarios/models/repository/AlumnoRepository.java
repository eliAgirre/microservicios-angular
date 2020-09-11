package com.proyecto.microservicios.app.usuarios.models.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.proyecto.microservicios.commons.alumnos.models.entity.Alumno;

public interface AlumnoRepository extends PagingAndSortingRepository<Alumno, Long> {

	@Query("select a from Alumno a where upper(a.nombre) like upper(concat('%', ?1, '%')) or upper(a.apellido) like upper(concat('%', ?1, '%'))")
	public List<Alumno> findByNombreOrApellido(String term);
	
	// ordena mediante el id de forma ascendete sin paginacion
	public Iterable<Alumno> findAllByOrderByIdAsc(); 

	// ordena mediante el id de forma ascendete con paginacion
	public Page<Alumno> findAllByOrderByIdAsc(Pageable pageable); 
	
}
