package com.proyecto.microservicios.app.exams.services;

import java.util.List;

import com.proyecto.microservicios.app.commons.services.CommonService;
import com.proyecto.microservicios.commons.exams.models.entity.Asignatura;
import com.proyecto.microservicios.commons.exams.models.entity.Examen;

public interface ExamenService extends CommonService<Examen> {
	
	public List<Examen> findByNombre(String term);
	
	public Iterable<Asignatura> findAllAsignaturas();
	
	public Iterable<Long> findExamenesIdsConRespuestasByPreguntaIds(Iterable<Long> preguntaIds);

}
