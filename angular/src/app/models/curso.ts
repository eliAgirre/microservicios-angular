import { Alumno } from './alumno';
import { Examen } from './examen';
import { Generic } from './generic';

export class Curso implements Generic {

    // mismo atributos del Entity Spring
    id: number; 
    nombre: string;
    createAt: string;
    alumnos: Alumno[] = []; // se inicializa el array vacio
    examenes: Examen[] = [];

}
