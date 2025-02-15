import { Routes } from '@angular/router';

import { CadastroAlunosComponent } from './components/cadastro-alunos/cadastro-alunos.component';
import { ListaAlunosComponent } from './components/lista-alunos/lista-alunos.component';
import { AlteracaoAlunosComponent } from './components/alteracao-alunos/alteracao-alunos.component';
import { DetalharAlunosComponent } from './components/detalhar-alunos/detalhar-alunos.component';
import { RemoveAlunosComponent } from './components/remove-alunos/remove-alunos.component';
import { ListaContratosComponent } from './components/lista-contratos/lista-contratos.component';


export const routes: Routes = [
    {path:'cadastrar-alunos', component: CadastroAlunosComponent},
    {path: 'alunos', component: ListaAlunosComponent},
    {path: 'editar-aluno/:id', component: AlteracaoAlunosComponent},
    {path: 'detalhar-aluno/:id', component: DetalharAlunosComponent},
    {path: 'remover-aluno/:id', component: RemoveAlunosComponent},
    {path: 'contratos', component: ListaContratosComponent}
];
