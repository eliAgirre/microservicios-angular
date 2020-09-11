import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Respuesta } from '../models/respuesta';
import { Alumno } from '../models/alumno';
import { Examen } from '../models/examen';

import { BASE_ENDPOINT } from '../config/app';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private baseEndpoint = BASE_ENDPOINT + '/resps';

  private cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  crear(respuestas: Respuesta[] ): Observable<Respuesta[]>{

    return this.http.post<Respuesta[]>(this.baseEndpoint, 
                                        respuestas, 
                                        {headers: this.cabeceras}
                                      );
  }

  getRespsAlumnoXExam(alumno: Alumno, examen: Examen): Observable<Respuesta[]>{

    return this.http.get<Respuesta[]>(`${this.baseEndpoint}/alumno/${alumno.id}/examen/${examen.id}`);
  }

}
