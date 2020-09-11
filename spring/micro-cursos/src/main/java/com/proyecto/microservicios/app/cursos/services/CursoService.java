package com.proyecto.microservicios.app.cursos.services;

import com.proyecto.microservicios.app.commons.services.CommonService;
import com.proyecto.microservicios.app.cursos.models.entity.Curso;
import com.proyecto.microservicios.commons.alumnos.models.entity.Alumno;

public interface CursoService extends CommonService<Curso>{

	public Curso findCursoByAlumnoId(Long id);
	
	public Iterable<Long> obtenerExamenesIdsConRespuestasAlumno(Long alumnoId);
	
	public Iterable<Alumno> obtenerAlumnosPorCurso(Iterable<Long> ids);
	
	public void eliminarCursoAlumnoPorId(Long id);
	
}
