import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2' // ES6 Modules or TypeScript

import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';
import { CommonFormComponent } from '../common-form.component';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent
       extends CommonFormComponent<Alumno, AlumnoService>
       implements OnInit {

  private fotoSeleccionada: File; 

	constructor(service: AlumnoService, 
        router: Router,
        route: ActivatedRoute){

      super(service, router, route);
      this.titulo = "Crear Alumnos";
      this.model = new Alumno();
      this.redirect = '/alumnos';
      this.nombreModel = Alumno.name;
  }

  public seleccinarFoto(event): void {

    this.fotoSeleccionada = event.target.files[0]; // se guarda la primera imagen 
    console.info(this.fotoSeleccionada); // muestra en la consola

    // validamos la foto
    if( this.fotoSeleccionada.type.indexOf('image') < 0){ // -1
      this.fotoSeleccionada = null;
      // se muestra el error
      Swal.fire('Error al seleccionar la foto:', // titulo
                'El archivo debe ser de tipo imagen', // msg
                'error' // tipo de error
               );
    }

  } 

  public crear(): void {

    // si la foto es seleccionada
    if( !this.fotoSeleccionada ){
      // invocamos el service -> crear del padre
      super.crear(); // a su vez invoca la de service
    }
    else{
      this.service.crearConFoto(this.model, this.fotoSeleccionada).subscribe(alumno => {
        console.log(alumno);
        Swal.fire('Nuevo:',`${this.nombreModel} ${alumno.nombre} creado con éxito`, 'success');
        this.router.navigate([this.redirect]);
      }, err => {
        if( err.status === 400 ){
          this.error = err.error;
          console.log(this.error);
        }
      });
    }
  }

  public editar(): void {

    // si la foto es seleccionada
    if( !this.fotoSeleccionada ){
      // invocamos el service -> crear del padre
      super.editar(); // a su vez invoca la de service
    }
    else{
      this.service.editarConFoto(this.model, this.fotoSeleccionada).subscribe(alumno => {
        console.log(alumno);
        Swal.fire('Editado:',`${this.nombreModel} ${alumno.nombre} actualizado con éxito`, 'success');
        this.router.navigate([this.redirect]);
      }, err => {
        if( err.status === 400 ){
          this.error = err.error;
          console.log(this.error);
        }
      });
    }
  }

}
