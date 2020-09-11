import { Examen } from './examen';

export class Pregunta {

    // mismo atributos del Entity Spring
    id: number; 
    texto: string;
    examen: Examen;
}
