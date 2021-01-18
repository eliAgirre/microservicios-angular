import { Alumno } from "./alumno";
import { Pregunta } from "./pregunta";

export class Respuesta {

    id: string;
    texto: string;
    resp_alumno:string;
    resp_correcta:string;
    alumno: Alumno;
    pregunta: Pregunta;

}
