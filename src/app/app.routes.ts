import { Routes } from '@angular/router';

import { CadastroAlunosComponent } from './components/cadastro-alunos/cadastro-alunos.component';
import { ListaAlunosComponent } from './components/lista-alunos/lista-alunos.component';
import { AlteracaoAlunosComponent } from './components/alteracao-alunos/alteracao-alunos.component';


export const routes: Routes = [
    {path:'cadastrar-alunos', component: CadastroAlunosComponent},
    {path: 'alunos', component: ListaAlunosComponent},
    {path: 'editar-aluno/:id', component: AlteracaoAlunosComponent}
];
