package com.proyecto.microservicios.app.cursos.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="micro-resps")
public interface RespuestaFeignClient {

	@GetMapping("/alumno/{alumnoId}/examenes-respondidos")
	public List<Long> obtenerExamenesIdsConRespuestasAlumno(@PathVariable Long alumnoId);
	
}
