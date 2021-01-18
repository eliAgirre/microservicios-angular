package com.proyecto.microservicios.app.respuestas.models.entity;

import org.springframework.data.annotation.Id;
//import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import com.proyecto.microservicios.commons.alumnos.models.entity.Alumno;
import com.proyecto.microservicios.commons.exams.models.entity.Pregunta;

@Document(collection = "respuestas")
public class Respuesta {
	
	@Id
	private String id;
	
	private String texto;
	private String resp_alumno;
	private String resp_correcta;

	//@Transient
	private Alumno alumno;

	private Long alumnoId;

	//@Transient
	private Pregunta pregunta;
	
	private Long preguntaId;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}
	
	public String getResp_alumno() {
		return resp_alumno;
	}

	public void setResp_alumno(String resp_alumno) {
		this.resp_alumno = resp_alumno;
	}

	public String getResp_correcta() {
		return resp_correcta;
	}

	public void setResp_correcta(String resp_correcta) {
		this.resp_correcta = resp_correcta;
	}

	public Alumno getAlumno() {
		return alumno;
	}

	public void setAlumno(Alumno alumno) {
		this.alumno = alumno;
	}

	public Pregunta getPregunta() {
		return pregunta;
	}

	public void setPregunta(Pregunta pregunta) {
		this.pregunta = pregunta;
	}

	public Long getAlumnoId() {
		return alumnoId;
	}

	public void setAlumnoId(Long alumnoId) {
		this.alumnoId = alumnoId;
	}

	public Long getPreguntaId() {
		return preguntaId;
	}

	public void setPreguntaId(Long preguntaId) {
		this.preguntaId = preguntaId;
	}
	
}
