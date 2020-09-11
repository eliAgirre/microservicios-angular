import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { ExamsComponent } from './components/exams/exams.component';
import { AlumnosFormComponent } from './components/alumnos/alumnos-form.component';
import { CursoFormComponent } from './components/cursos/curso-form.component';
import { ExamFormComponent } from './components/exams/exam-form.component';
import { AsignarAlumnosComponent } from './components/cursos/asignar-alumnos.component';
import { AsignarExamenesComponent } from './components/cursos/asignar-examenes.component';
import { ResponderExamenComponent } from './components/alumnos/responder-examen.component';

const routes: Routes = [
	/* raiz */
	{
		path: '',
		pathMatch: `full`,
		redirectTo: 'cursos'
	},
	/* alumnos */
	{ 
		path: 'alumnos',
	  	component: AlumnosComponent
	},
	{ 
		path: "alumnos/form", 
		component: AlumnosFormComponent
	},
	/*  alumno, responder -> examen */
	{ 
		path: 'alumnos/responder-examen/:id', 
		component: ResponderExamenComponent 
	},
	{ 
		path: "alumnos/form/:id", 
		component: AlumnosFormComponent
	},
	/* cursos */
	{ 
		path: 'cursos',
	  	component: CursosComponent
	},
	{
		path: 'cursos/form', 
		component: CursoFormComponent
	},
	{
		path: 'cursos/form/:id',
		component: CursoFormComponent
	},
	/* exams */	
	{ 
		path: 'exams',
	  	component: ExamsComponent
	},
	{
		path: 'exams/form', 
		component: ExamFormComponent 
	},
	{
		path: 'exams/form/:id'
		, component: ExamFormComponent 
	},
	/* cursos -> asignar alumnos */
	{ 
		path: 'cursos/asignar-alumnos/:id', 
		component: AsignarAlumnosComponent 
	},
	/* cursos -> asignar examenes */
	{ 
		path: 'cursos/asignar-examenes/:id', 
		component: AsignarExamenesComponent 
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
