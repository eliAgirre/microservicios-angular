import { Examen } from './examen';

export class Pregunta {

    // mismo atributos del Entity Spring
    id: number; 
    texto: string;
    opcion_a:string;
    opcion_b:string;
    opcion_c:string;
    opcion_d:string;
    resp_correcta:string;
    examen: Examen;
}
