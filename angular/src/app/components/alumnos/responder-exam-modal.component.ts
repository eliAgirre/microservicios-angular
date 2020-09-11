import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Curso } from '../../models/curso';
import { Alumno } from '../../models/alumno';
import { Examen } from '../../models/examen';
import { Pregunta } from '../../models/pregunta';
import { Respuesta } from '../../models/respuesta';

@Component({
  selector: 'app-responder-exam-modal',
  templateUrl: './responder-exam-modal.component.html',
  styleUrls: ['./responder-exam-modal.component.css']
})
export class ResponderExamModalComponent implements OnInit {

  curso: Curso;
  alumno: Alumno;
  examen: Examen;

  respuestas:Map<number, Respuesta> = new Map<number, Respuesta>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public modalRef: MatDialogRef<ResponderExamModalComponent>) { }

  ngOnInit(): void {
    // se capturan los objetos
    this.curso = this.data.curso as Curso;
    this.alumno = this.data.alumno as Alumno;
    this.examen = this.data.examen as Examen;
  }

  cancelar(): void{

    this.modalRef.close();
  }

  responder(pregunta: Pregunta, event): void{

    const texto = event.target.value as string;
    const respuesta = new Respuesta();
    respuesta.alumno = this.alumno;
    respuesta.pregunta = pregunta;

    const examen = new Examen();
    examen.id = this.examen.id;
    examen.nombre = this.examen.nombre;

    respuesta.pregunta.examen = examen;
    respuesta.texto = texto;

    this.respuestas.set(pregunta.id, respuesta);
    console.log(this.respuestas)

  }

}
