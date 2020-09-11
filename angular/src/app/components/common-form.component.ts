import { OnInit, Directive } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2' // ES6 Modules or TypeScript

import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';

@Directive()
export abstract class CommonFormComponent<E extends Generic, S extends CommonService<E>> implements OnInit {

  titulo: string;
  model: E; // se va a instanciar de forma especifica
  error: any;
  protected redirect: string; // ruta
  protected nombreModel: string;

	constructor(protected service: S, 
              protected router: Router,
              protected route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id'); // signo mas se convierte a string
      if( id ){
        this.service.ver(id).subscribe(m => {
          this.model = m;
          this.titulo = 'Editar ' + this.nombreModel;
        })
      }
    })
  }

  public crear(): void {
    this.service.crear(this.model).subscribe(m => {
      console.log(m);
      Swal.fire('Nuevo:',`${this.nombreModel} ${m.nombre} creado con éxito`, 'success');
      this.router.navigate([this.redirect]);
    }, err => {
      if( err.status === 400 ){
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

  public editar(): void {
    this.service.editar(this.model).subscribe(m => {
      console.log(m);
      Swal.fire('Editado:',`${this.nombreModel} ${m.nombre} actualizado con éxito`, 'success');
      this.router.navigate([this.redirect]);
    }, err => {
      if( err.status === 400 ){
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

}
