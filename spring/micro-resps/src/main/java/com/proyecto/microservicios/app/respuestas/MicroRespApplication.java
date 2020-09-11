 package com.proyecto.microservicios.app.respuestas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})
@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
//@EntityScan({"com.proyecto.microservicios.commons.alumnos.models.entity", "com.proyecto.microservicios.commons.exams.models.entity", "com.proyecto.microservicios.app.respuestas.models.entity",})
public class MicroRespApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroRespApplication.class, args);
	}

}
