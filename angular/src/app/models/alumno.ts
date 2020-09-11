import { Generic } from './generic';

export class Alumno implements Generic {

    // mismo atributos del Entity Spring
    id: number; 
    nombre: string;
    apellido: string;
    email: string;
    createAt: string;
    fotoHashCode: number;

}
