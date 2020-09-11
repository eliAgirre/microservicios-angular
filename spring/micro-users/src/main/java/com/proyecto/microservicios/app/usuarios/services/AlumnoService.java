package com.proyecto.microservicios.app.usuarios.services;

import java.util.List;

import com.proyecto.microservicios.app.commons.services.CommonService;
import com.proyecto.microservicios.commons.alumnos.models.entity.Alumno;

public interface AlumnoService extends CommonService<Alumno>{
	
	public List<Alumno> findByNombreOrApellido(String term);
	
	public Iterable<Alumno> findAllById(Iterable<Long> ids);
	
	public void eliminarCursoAlumnoPorId(Long id);
	
}
