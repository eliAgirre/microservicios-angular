import { Pregunta } from './pregunta';
import { Asignatura } from './asignatura';
import { Generic } from './generic';

export class Examen implements Generic {

    // mismo atributos del Entity Spring
    id: number; 
    nombre: string;
    createAt: string;
    preguntas: Pregunta[] = [];
    asignaturaPadre: Asignatura;
    asignaturaHija: Asignatura;
    repondido: boolean;
}
