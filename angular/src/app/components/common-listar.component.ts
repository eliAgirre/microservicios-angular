import { OnInit, ViewChild, Directive } from '@angular/core';

import Swal from 'sweetalert2' // ES6 Modules or TypeScript

import { PageEvent, MatPaginator } from '@angular/material/paginator';

import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';

@Directive()
export abstract class CommonListarComponent<E extends Generic, S extends CommonService<E>> implements OnInit {

  titulo: String;
  lista: E[];
  protected nombreModel: string;

  totalRegistros = 0;
  paginaActual = 0;
  totalXpagina = 4;
  opcionesTotalPagina: number[] = [3, 5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: S) { }

  ngOnInit(): void {
	  this.calcularRangos();
  }

  paginar(event: PageEvent): void{
    this.paginaActual = event.pageIndex;
    this.totalXpagina = event.pageSize;
    this.calcularRangos();
  }
  
  
  private calcularRangos(){
    this.service.listarPaginas(this.paginaActual.toString(), this.totalXpagina.toString())
      .subscribe(p => { 
        this.lista = p.content as E[];
        this.totalRegistros = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        });
  }

  public borrar(e: E): void {
    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desae eliminar a ${e.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
            this.service.eliminar(e.id).subscribe(() => {
              this.calcularRangos();
              Swal.fire('Borrado:',`${this.nombreModel} ${e.nombre} borrado con éxito`, 'success');
          })
      }
    })

  }

}