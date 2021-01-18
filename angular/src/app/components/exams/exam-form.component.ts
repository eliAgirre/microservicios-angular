import { Component, OnInit } from '@angular/core';
import { CommonFormComponent } from '../common-form.component';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2' // ES6 Modules or TypeScript

import { Examen } from '../../models/examen';
import { ExamenService } from '../../services/examen.service';
import { Asignatura } from '../../models/asignatura';
import { Pregunta } from '../../models/pregunta';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent        
       extends CommonFormComponent<Examen, ExamenService> 
       implements OnInit {

  asignaturasPadre: Asignatura[] = [];
  asignaturasHija: Asignatura[] = [];
  //errorPreguntas: string;

  constructor(service: ExamenService,
              router: Router,
              route: ActivatedRoute){

      super(service, router, route);
      this.titulo = "Crear Examen";
      this.model = new Examen();
      this.redirect = '/exams';
      this.nombreModel = Examen.name;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id'); // signo mas se convierte a string
      if( id ){
        this.service.ver(id).subscribe(m => {
          this.model = m;
          this.titulo = 'Editar ' + this.nombreModel;
          this.cargarHijos();
          /*
          this.service.findAllAsignatura().subscribe(asignaturas => 
            this.asignaturasHija = asignaturas.
                                    filter(a => a.padre && a.padre.id === this.model.asignaturaPadre.id ))
          */
            
        })
      }
    });

    this.service.findAllAsignatura().
    subscribe(asignaturas => { 
      // solo se obtienen las padres
      this.asignaturasPadre = asignaturas.filter(a => !a.padre );
    });

  }

  public crear(): void {
    if( this.model.preguntas.length === 0){
      console.log(this.model.preguntas.length);
      //this.errorPreguntas = 'Examen debe tener preguntas';
      Swal.fire('Error Preguntas', // titulo
            'Examen debe tener preguntas', // msg
            'error' // tipo
            );
      
      return;
    }
    //this.errorPreguntas = undefined;
    this.eliminarPreguntasVacias(); // elimina las preguntas vacias antes de crear
    super.crear(); // se sobreescribre el metodo del padre
  }
  
  public editar(): void {
    if( this.model.preguntas.length === 0){
      //this.errorPreguntas = 'Examen debe tener preguntas';
      Swal.fire('Error Preguntas', // titulo
            'Examen debe tener preguntas', // msg
            'error' // tipo
            );
      return;
    }
    //this.errorPreguntas = undefined;
    this.eliminarPreguntasVacias(); // elimina las preguntas vacias antes de editar
    super.editar();
  }

  cargarHijos(): void {

    this.asignaturasHija = this.model.asignaturaPadre ? this.model.asignaturaPadre.hijos : [];
  }

  compararAsignatura(a1: Asignatura, a2: Asignatura): boolean {

    if( a1 === undefined && a2 === undefined){
      return true;
    }
    /*
    if( a1 === null || a2 === null || a1 === undefined || a2 === undefined){
      return false;
    }

    if(a1.id === a2.id){
      return true;
    }*/

    return (a1 === null || a2 === null || a1 === undefined || a2 === undefined) 
          ? false : a1.id === a2.id;

  }

  agregarPregunta(): void {
    this.model.preguntas.push(new Pregunta());
  }

  asignarTexto(pregunta: Pregunta, event: any): void {
    pregunta.texto = event.target.value as string; // event tiene el texto que se escribe en el input
    console.log(this.model);
  }

  asignarOpcionA(pregunta: Pregunta, event: any): void {
    pregunta.opcion_a = event.target.value as string;
    console.log(this.model);
  }

  asignarOpcionB(pregunta: Pregunta, event: any): void {
    pregunta.opcion_b = event.target.value as string;
    console.log(this.model);
  }

  asignarOpcionC(pregunta: Pregunta, event: any): void {
    pregunta.opcion_c = event.target.value as string;
    console.log(this.model);
  }

  asignarOpcionD(pregunta: Pregunta, event: any): void {
    pregunta.opcion_d = event.target.value as string;
    console.log(this.model);
  }

  asignarRespCorrecta(pregunta: Pregunta, event: any): void {
    pregunta.resp_correcta = event.target.value as string;
    console.log(this.model);
  }

  eliminarPregunta(pregunta): void{
    this.model.preguntas = this.model.preguntas.filter(p => pregunta.texto !== p.texto); // se elimina la pregunta del array
  }

  eliminarPreguntasVacias(): void{
    this.model.preguntas = this.model.preguntas.filter(p => p.texto != null && p.texto.length > 0);
  }

}
