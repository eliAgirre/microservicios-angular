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
	private String opcion_a;
	private String opcion_b;
	private String opcion_c;
	private String opcion_d;
	private String resp_correcta;
	
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
	
	public String getOpcion_a() {
		return opcion_a;
	}
	
	public void setOpcion_a(String opcion_a) {
		this.opcion_a = opcion_a;
	}

	public String getOpcion_b() {
		return opcion_b;
	}

	public void setOpcion_b(String opcion_b) {
		this.opcion_b = opcion_b;
	}

	public String getOpcion_c() {
		return opcion_c;
	}

	public void setOpcion_c(String opcion_c) {
		this.opcion_c = opcion_c;
	}

	public String getOpcion_d() {
		return opcion_d;
	}

	public void setOpcion_d(String opcion_d) {
		this.opcion_d = opcion_d;
	}

	public String getResp_correcta() {
		return resp_correcta;
	}

	public void setResp_correcta(String resp_correcta) {
		this.resp_correcta = resp_correcta;
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
