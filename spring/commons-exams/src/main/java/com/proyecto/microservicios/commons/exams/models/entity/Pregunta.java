package com.proyecto.microservicios.commons.exams.models.entity;


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
@Table(name="preguntas")
public class Pregunta {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String texto;
	
	@JsonIgnoreProperties(value = {"preguntas"})
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="examen_id")
	private Examen examen;

	public Long getId() {
		return id;
	}

	public String getTexto() {
		return texto;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public Examen getExamen() {
		return examen;
	}

	public void setExamen(Examen examen) {
		this.examen = examen;
	}

	@Override
	public boolean equals(Object obj) {
		
		if( this == obj ) {
			return true;
		}
		
		System.out.println(obj);
		
		// si no es una instancia del Pregunta se devuelve false
		if( !(obj instanceof Pregunta) ) {
			return false;
		}
		
		Pregunta p = (Pregunta) obj;
				
		return this.id != null && this.id.equals(p.getId());
	}
	
	

}
