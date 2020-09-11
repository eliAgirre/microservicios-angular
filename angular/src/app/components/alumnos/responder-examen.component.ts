import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Alumno } from '../../models/alumno';
import { Curso } from '../../models/curso';
import { Examen } from '../../models/examen';
import { Respuesta } from '../../models/respuesta';

import { AlumnoService } from '../../services/alumno.service';
import { CursoService } from '../../services/curso.service';
import { RespuestaService } from '../../services/respuesta.service';

import { ResponderExamModalComponent } from './responder-exam-modal.component';
import Swal from 'sweetalert2';
import { VerExamModalComponent } from './ver-exam-modal.component';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/overlay-directives';

@Component({
  selector: 'app-responder-examen',
  templateUrl: './responder-examen.component.html',
  styleUrls: ['./responder-examen.component.css']
})
export class ResponderExamenComponent implements OnInit {

  alumno: Alumno;
  curso: Curso;
  examenes: Examen[] = [];

  dataSource: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSizeOptions: number[] = [3, 5, 10, 20, 50];

  mostrarColumnasExamenes = ['id', 'nombre', 'asignaturas', 'preguntas', 'responder', 'ver']

  constructor(private route: ActivatedRoute,
              private alumnoService: AlumnoService,
              private cursoService: CursoService,
              private respuestaService: RespuestaService,
              public dialog: MatDialog
             ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = +params.get('id');
      this.alumnoService.ver(id).subscribe(alumno => {
        this.alumno = alumno;
        this.cursoService.obtenerCursoXalumnoId(this.alumno).subscribe(curso => {
          this.curso = curso;
          this.examenes = (curso && curso.examenes)? curso.examenes : [];
          this.dataSource = new MatTableDataSource<Examen>(this.examenes);
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = 'Registros por páginas';
        });
      });

    });
    
  }

  responderExamen(examen: Examen): void{

    // necesitamos un objeto de ventana modal, para ello inyectamos en el constructor
    const modalRef = this.dialog.open(ResponderExamModalComponent, {
      width: '750px',
      data: {curso: this.curso, alumno: this.alumno, examen: examen }
    });

    // despues de cerrar la ventana modal se envian las respuestas
    modalRef.afterClosed().subscribe((respuestasMap: Map<number, Respuesta>) => {
      console.log('modal responder examen ha sido enviado y cerrado');
      console.log(respuestasMap);
      if( respuestasMap ){
        const respuestas: Respuesta[] = Array.from(respuestasMap.values());
        console.log(respuestas);
        this.respuestaService.crear(respuestas).subscribe(resp => {
          examen.repondido = true;
          console.log(examen);
          Swal.fire('Enviada: ', // titulo
                    'Preguntas enviadas con éxito', // msg
                    'success' // tipo
                   );
          console.log(resp);
        });
      }
    });
  }

  verExamen(examen: Examen): void {

    this.respuestaService.getRespsAlumnoXExam(this.alumno, examen).subscribe(resp => {

      const modalRef = this.dialog.open(VerExamModalComponent, {

        width: '750px',
        data: {curso: this.curso, examen: examen, respuestas: resp}

      });

      // se ve el resultado, no se emite nada
      modalRef.afterClosed().subscribe(() => {
        console.log('Modal ver examen cerrado');
      });

    });

  }


}
