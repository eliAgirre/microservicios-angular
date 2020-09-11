import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Curso } from '../../models/curso';
import { Alumno } from '../../models/alumno';

import { CursoService } from '../../services/curso.service';
import { AlumnoService } from '../../services/alumno.service';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-asignar-alumnos',
  templateUrl: './asignar-alumnos.component.html',
  styleUrls: ['./asignar-alumnos.component.css']
})
export class AsignarAlumnosComponent implements OnInit {

  curso: Curso;
  alumnosAsignar: Alumno[] = [];
  alumnos: Alumno[] = [];

  tabIndex = 0;

  mostrarColumnas: string[] = ['nombre', 'apellido', 'seleccion'];
  mostrarColumnasAlumnos: string[] = ['id', 'nombre', 'apellido', 'email', 'eliminar'];
  seleccion: SelectionModel<Alumno> = new SelectionModel<Alumno>(true, []);

  dataSource: MatTableDataSource<Alumno>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSizeOptions: number[] = [3, 5, 10, 20, 50];
  
  // inyectamos los objetos al componente
	constructor(private route: ActivatedRoute,
    private cursoService: CursoService,
    private alumnoService: AlumnoService){ }

    ngOnInit(): void {
      // emite los parametros
      this.route.paramMap.subscribe(params => {
        const id: number = +params.get('id');
        this.cursoService.ver(id).subscribe(c => {
          this.curso = c;
          this.alumnos = this.curso.alumnos;
          this.iniciarPaginador();
          // esto se hace cada vez que se asigne o elimine el alumno
          /*
          this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = 'Registros por página';
          */
        });
      })
    }

    private iniciarPaginador(): void {
      // esto se hace cada vez que se asigne o elimine el alumno
      this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    }

    buscar(nombre: string):void {

      nombre = nombre !== undefined ? nombre.trim(): '';
        if( nombre !== '' ){
          this.alumnoService.buscarPorNombre(nombre)
                            .subscribe(alumnos => this.alumnosAsignar = alumnos.filter(a => {
                              let filtrar = true;
                              this.alumnos.forEach(ca => {
                                if( a.id === ca.id ){
                                  filtrar = false;
                                }
                              });
                              return filtrar;
                            }));
        }
    
    }

    allSelected(): boolean {
	
      const numSelected = this.seleccion.selected.length;
      const numAlumnos = this.alumnosAsignar.length;
      return ( numSelected === numAlumnos);
    
    }
    
    selectDeslectAll(): void {
    
      this.allSelected() ? this.seleccion.clear() 
              : this.alumnosAsignar.forEach(a => this.seleccion.select(a));
    
    }

    asignar(): void { 

      console.log(this.seleccion.selected);
      console.log(this.curso);
      this.cursoService.asignarAlumnos(this.curso, this.seleccion.selected)
                       .subscribe(c => {
                        this.tabIndex = 2; // para que cargue el tab de alumnos
                         Swal.fire(
                           'Asignados: ', // titulo
                           `Alumnos Asignados con éxito al curso ${this.curso.nombre}`, // msg
                           'success' // tipo
                         );
                         this.alumnos = this.alumnos.concat(this.seleccion.selected);
                         this.iniciarPaginador();
                         this.alumnosAsignar = []
                         this.seleccion.clear();
                        },
                        e => {
                          if( e.status === 500 ){
                            const mensaje = e.error.message as string;
                            // si el mensaje incluye el contenido 
                            if( mensaje.indexOf("ConstraintViolationException") > -1 ){
                              Swal.fire(
                                'Cuidado: ', // titulo
                                'No se puede asignar al alumno ya que está asociado a otro curso', // msg
                                'error' // tipo
                              )
                            }
                          }
                        });
    }

    eliminarAlumno(alumno: Alumno): void {

      Swal.fire({
        title: 'Cuidado:',
        text: `¿Seguro que desae eliminar a ${alumno.nombre} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.value) {

          this.cursoService.eliminarAlumno(this.curso, alumno)
          .subscribe(curso => {
           this.alumnos = this.alumnos.filter(a => a.id !== alumno.id);
           this.iniciarPaginador();
           Swal.fire(
                     'Eliminado: ', // titulo
                     `Alumno ${alumno.nombre} eliminado con éxito del curso ${curso.nombre}.` , // msg
                     'success' // tipo
                    )
          });

        }
      });
    }

}
