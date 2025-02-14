import { Injectable } from "@angular/core";
import { Aluno } from "../model/Alunos";
import { Responsavel } from "../model/Responsavel";

@Injectable({
  providedIn: 'root' // Torna o serviço disponível globalmente
})


export class ServiceContratos{
    private aluno: Aluno;
    private responsavel: Responsavel

}
