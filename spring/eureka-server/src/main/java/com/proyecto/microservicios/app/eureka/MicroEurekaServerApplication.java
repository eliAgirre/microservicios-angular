package com.proyecto.microservicios.app.eureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class MicroEurekaServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroEurekaServerApplication.class, args);
	}

}
