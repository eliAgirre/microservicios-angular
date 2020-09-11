export class Asignatura {

    // mismo atributos del Entity Spring
    id: number; 
    nombre: string;
    padre: Asignatura;
    hijos: Asignatura[] = [];

}
