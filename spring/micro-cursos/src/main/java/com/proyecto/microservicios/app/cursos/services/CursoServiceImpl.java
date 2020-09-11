package com.proyecto.microservicios.app.cursos.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proyecto.microservicios.app.commons.services.CommonServiceImpl;
import com.proyecto.microservicios.app.cursos.clients.AlumnoFeignClient;
import com.proyecto.microservicios.app.cursos.clients.RespuestaFeignClient;
import com.proyecto.microservicios.app.cursos.models.entity.Curso;
import com.proyecto.microservicios.app.cursos.models.repository.CursoRepository;
import com.proyecto.microservicios.commons.alumnos.models.entity.Alumno;

@Service
public class CursoServiceImpl extends CommonServiceImpl<Curso, CursoRepository> implements CursoService {
	
	@Autowired
	private RespuestaFeignClient client; // se inyecta
	
	@Autowired
	private AlumnoFeignClient clientAlumno;
	
	@Override
	@Transactional(readOnly = true)
	public Curso findCursoByAlumnoId(Long id) {
		return repository.findCursoByAlumnoId(id);
	}

	@Override
	public Iterable<Long> obtenerExamenesIdsConRespuestasAlumno(Long alumnoId) {
		return client.obtenerExamenesIdsConRespuestasAlumno(alumnoId);
	}

	@Override
	public Iterable<Alumno> obtenerAlumnosPorCurso(Iterable<Long> ids) {
		return clientAlumno.obtenerAlumnosPorCurso(ids);
	}

	@Override
	@Transactional
	public void eliminarCursoAlumnoPorId(Long id) {
		repository.eliminarCursoAlumnoPorId(id);
	}


}
