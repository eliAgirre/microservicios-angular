package com.proyecto.microservicios.commons.exams.models.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="asignaturas")
public class Asignatura {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nombre;
	
	@ManyToOne(fetch = FetchType.LAZY)
	//@JsonIgnoreProperties(value = {"padre"}, allowSetters = true)
	@JsonIgnoreProperties(value = {"hijos", "handler", "hibernateLazyInitializer"}, allowSetters = true )
	private Asignatura padre;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "padre", cascade = CascadeType.ALL)
	//@JsonIgnoreProperties(value = {"hijos"}, allowSetters = true)
	@JsonIgnoreProperties(value = {"padre", "handler", "hibernateLazyInitializer"}, allowSetters = true)
	private List<Asignatura> hijos;
	
	public Asignatura() {
		this.hijos = new ArrayList<>();
	}

	public Long getId() {
		return id;
	}

	public String getNombre() {
		return nombre;
	}

	public Asignatura getPadre() {
		return padre;
	}

	public List<Asignatura> getHijos() {
		return hijos;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public void setPadre(Asignatura padre) {
		this.padre = padre;
	}

	public void setHijos(List<Asignatura> hijos) {
		this.hijos = hijos;
	}

}
