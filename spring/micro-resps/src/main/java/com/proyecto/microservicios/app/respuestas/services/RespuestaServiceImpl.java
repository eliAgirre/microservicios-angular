package com.proyecto.microservicios.app.respuestas.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.proyecto.microservicios.app.respuestas.models.entity.Respuesta;
import com.proyecto.microservicios.app.respuestas.models.repository.RespuestaRepository;

@Service
public class RespuestaServiceImpl implements RespuestaService {

	@Autowired // para inyectar
	private RespuestaRepository repository;
	
	//@Autowired para inyectar
	//private ExamenFeignClient examenClient;
	
	// para inyectar
	/*
	public RespuestaServiceImpl(ExamenFeignClient examenClient) {
		this.examenClient = examenClient;
	}*/
	
	@Override
	public Iterable<Respuesta> saveAll(Iterable<Respuesta> respuestas) {
		return repository.saveAll(respuestas);
	}

	@Override
	public Iterable<Respuesta> findRespuestaByAlumnoByExamen(Long alumnoId, Long examenId) {
		/*
		Examen examen = examenClient.obtenerExamenPorId(examenId);
		
		List<Pregunta> preguntas = examen.getPreguntas();
		List<Long> preguntaIds = preguntas.stream().map(p -> p.getId()).collect(Collectors.toList());
		
		List<Respuesta> respuestas = (List<Respuesta>) repository.findRespuestaByAlumnoByPreguntaIds(alumnoId, preguntaIds);
		
		respuestas = respuestas.stream().map(r ->{
			
			preguntas.forEach(p ->{
				
				if(p.getId() == r.getPreguntaId()) {
					r.setPregunta(p);
				}
			});
			
			return r;
			
		}).collect(Collectors.toList());
		*/
		
		// consulta local mongo
		List<Respuesta> respuestas = (List<Respuesta>) repository.findRespuestaByAlumnoByExam(alumnoId, examenId);		
		
		return respuestas;
	}

	@Override
	public Iterable<Long> findExamenesIdsConRespuestasByAlumno(Long alumnoId) {
		/*
		List<Respuesta> respuestasAlumno = (List<Respuesta>) repository.findByAlumnoId(alumnoId);
		
		List<Long> examenIds = Collections.emptyList();
		
		if(respuestasAlumno.size() > 0) {
			
		  List<Long> preguntaIds = respuestasAlumno.stream().map(r -> r.getPreguntaId()).collect(Collectors.toList());
		  examenIds = examenClient.obtenerExamenesIdsPorPreguntasIdRespondidas(preguntaIds);
		}
		*/
		
		List<Respuesta> respuestasAlumno = (List<Respuesta>) repository.findExamenesIdsConRespuestasByAlumno(alumnoId);
		List<Long> examenIds = (List<Long>) respuestasAlumno
											.stream()
											.map(r -> r.getPregunta().getExamen().getId())
											.distinct()
											.collect(Collectors.toList());
		
		return examenIds;
	}

	@Override
	public Iterable<Respuesta> findByAlumnoId(Long alumnoId) {
		return repository.findByAlumnoId(alumnoId);
	}

}