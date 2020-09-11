package com.proyecto.microservicios.app.exams;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EntityScan({"com.proyecto.microservicios.commons.exams.models.entity"})
@EnableEurekaClient
@SpringBootApplication
public class MicroExamsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroExamsApplication.class, args);
	}

}
