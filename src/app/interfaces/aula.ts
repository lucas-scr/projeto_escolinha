import { DiasDaSemana } from "../shared/Enums/enumDiasDaSemana";

export interface Aula{
    id: Number;
    diaSemana: keyof typeof DiasDaSemana;
    horario: String;
}