import { Component } from '@angular/core';

import { CommonListarComponent } from '../common-listar.component';
import { Examen } from 'src/app/models/examen';
import { ExamenService } from 'src/app/services/examen.service';


@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent 
       extends CommonListarComponent<Examen, ExamenService> {

  constructor(service: ExamenService) { 
    super(service);
    this.titulo = 'Listado de exámenes';
    this.nombreModel = Examen.name;
  }

}
