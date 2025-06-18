import { DiasDaSemana } from "../shared/enumDiasDaSemana";

export interface Aula{
    id: Number;
    diaSemana: keyof typeof DiasDaSemana;
    horario: String;
}