import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Curso } from '../../models/curso';
import { Examen } from '../../models/examen';

import { ExamenService } from '../../services/examen.service';
import { CursoService } from '../../services/curso.service';

import { map, flatMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-asignar-examenes',
  templateUrl: './asignar-examenes.component.html',
  styleUrls: ['./asignar-examenes.component.css']
})

export class AsignarExamenesComponent implements OnInit {

	curso: Curso;
	autocompleteControl = new FormControl();
	examenesFiltrados: Examen[] = [];
	examenesAsignar: Examen[] = [];
	examenes: Examen[] = [];

	mostrarColumnas = ['nombre', 'asignatura', 'eliminar'];
	mostrarColumnasExamenes = ['id', 'nombre', 'asignaturas', 'eliminar'];

	tabIndex = 0;
	
	dataSource: MatTableDataSource<Examen>;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	pageSizeOptions: number[] = [3, 5, 10, 20, 50];

	constructor(private route: ActivatedRoute,
				private router: Router,
				private cursoService: CursoService,
				private examenService: ExamenService
				){

	}

	ngOnInit(){
		this.route.paramMap.subscribe(params => {
			const id: number = +params.get('id');
			this.cursoService.ver(id).subscribe(c => {
				this.curso = c;
				this.examenes = c.examenes;
				this.iniciarPaginador();
			});
		});
		// reactivo
		this.autocompleteControl.valueChanges.pipe(
			// tratar el valor. Primero sera un string, pero en cuanto se busque en el backend sera de tipo Examen
			map(valor => typeof valor === 'string'? valor: valor.nombre ),

			// stream o flujo de tipo observable o reactivo -> cuando se usa de un observable a otro tipo de observable
			flatMap(valor => valor? this.examenService.filtrarPorNombre(valor): [] )
			
		).subscribe(examenes => this.examenesFiltrados = examenes);
	}

	mostrarNombre(examen? : Examen): string{

		return examen? examen.nombre : '';
	}

	selectExam(event: MatAutocompleteSelectedEvent): void {

		const examen = event.option.value as Examen;
		//this.examenesAsignar.push(examen); // el dataTable no nota el cambio, pero con un array si lo notara
		if( !this.existe(examen.id) ){
			this.examenesAsignar = this.examenesAsignar.concat(examen); // concat mantiene los datos que tiene y agrega otro
			console.log(this.examenesAsignar);
		}
		else{
			Swal.fire( 'Error: ' , // titulo
					   `El examen ${examen.nombre} ya está asignado al curso`, // msg
					   'error' // tipo
					 );
		}
		// resetear el valor en el autocomplete
		this.autocompleteControl.setValue('');
		event.option.deselect();
		event.option.focus();
	}

	eliminarDesasignar(examen: Examen): void{

		this.examenesAsignar = this.examenesAsignar.filter( e => examen.id !== e.id );
	}

	asignar(): void {

		console.log(this.examenesAsignar);
		this.cursoService.asginarExamenes(this.curso, this.examenesAsignar)
						 .subscribe(curso => {
							this.examenes = this.examenes.concat(this.examenesAsignar);
							this.iniciarPaginador();
							this.examenesAsignar = [];
							Swal.fire( 'Asignados: ', // titulo
										 `Examenes asignado con éxito al curso ${curso.nombre}`, // msg
										 'success' // tipo
									   );
							this.tabIndex = 2; // cambiamos de solapa
						 });
	}

	eliminarExamenCurso(examen: Examen): void{

		Swal.fire({

			title: 'Cuidado:',
			text: `¿Seguro que desae eliminar a ${examen.nombre} ?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar!'

		  }).then((result) => {

			if (result.value) {
	
			  this.cursoService.eliminarExamen(this.curso, examen)
			  .subscribe(curso => {
			   this.examenes = this.examenes.filter(e => e.id !== examen.id);
			   this.iniciarPaginador();
			   Swal.fire(
						 'Eliminado: ', // titulo
						 `Alumno ${examen.nombre} eliminado con éxito del curso ${curso.nombre}.` , // msg
						 'success' // tipo
						)
			  });
	
			}
		  });

	}
	
	private iniciarPaginador(): void {
		// esto se hace cada vez que se asigne o elimine el Examen
		this.dataSource = new MatTableDataSource<Examen>(this.examenes);
		this.dataSource.paginator = this.paginator;
		this.paginator._intl.itemsPerPageLabel = 'Registros por página';
	}
	

	private existe(id: number): boolean{

		let existe = false;

		this.examenesAsignar.concat(this.examenes).forEach(e => {
			if( id === e.id){
				existe = true;
			}
		})

		return existe;
	}

}
