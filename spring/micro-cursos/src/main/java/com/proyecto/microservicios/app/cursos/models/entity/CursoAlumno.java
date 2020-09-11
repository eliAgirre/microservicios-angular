package com.proyecto.microservicios.app.cursos.models.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="cursos_alumnos")
public class CursoAlumno {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="alumno_id", unique = true)
	private Long alumnoId; // no es una llave, pero es unica
	
	@JsonIgnoreProperties(value = {"cursoAlumnos"})
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="curso_id")
	private Curso curso; // no va a crear otra tabla y va a ser bidireccional

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAlumnoId() {
		return alumnoId;
	}

	public void setAlumnoId(Long alumnoId) {
		this.alumnoId = alumnoId;
	}

	public Curso getCurso() {
		return curso;
	}

	public void setCurso(Curso curso) {
		this.curso = curso;
	}
	
	@Override
	public boolean equals(Object obj){
		
        if( this == obj){
        	return true;
        }
        
        if( !(obj instanceof CursoAlumno)){
        	return false;
        }
        
        CursoAlumno ca = (CursoAlumno) obj;
        
        return this.alumnoId != null && this.alumnoId.equals(ca.getId());
	}
}
