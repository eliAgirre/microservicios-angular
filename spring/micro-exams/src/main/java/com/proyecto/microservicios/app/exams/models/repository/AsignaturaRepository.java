package com.proyecto.microservicios.app.exams.models.repository;

import org.springframework.data.repository.CrudRepository;

import com.proyecto.microservicios.commons.exams.models.entity.Asignatura;

public interface AsignaturaRepository extends CrudRepository<Asignatura, Long> {
	

}
