package com.proyecto.microservicios.app.cursos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableEurekaClient
@SpringBootApplication
@EntityScan( basePackages = {"com.proyecto.microservicios.commons.alumnos.models.entity", "com.proyecto.microservicios.commons.exams.models.entity", "com.proyecto.microservicios.app.cursos.models.entity" } )
@EnableFeignClients
public class MicroCursosApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroCursosApplication.class, args);
	}

}
