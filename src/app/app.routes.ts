import { Routes } from '@angular/router';

import { CadastroAlunosComponent } from './components/cadastro-alunos/cadastro-alunos.component';
import { ListaAlunosComponent } from './components/lista-alunos/lista-alunos.component';
import { EditarAlunosComponent } from './components/editar-alunos/editar-alunos.component';
import { DetalharAlunosComponent } from './components/detalhar-alunos/detalhar-alunos.component';
import { ListaContratosComponent } from './components/lista-contratos/lista-contratos.component';
import { CadastroContratosComponent } from './components/cadastro-contratos/cadastro-contratos.component';
import { EditarContratosComponent } from './components/editar-contratos/editar-contratos.component';
import { DetalharContratosComponent } from './components/detalhar-contratos/detalhar-contratos.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';


export const routes: Routes = [
    {path:'cadastrar-alunos', component: CadastroAlunosComponent},
    {path: 'alunos', component: ListaAlunosComponent}, 
    {path: 'editar-aluno/:id', component: EditarAlunosComponent},
    {path: 'detalhar-aluno/:id', component: DetalharAlunosComponent},
    {path: 'contratos', component: ListaContratosComponent},
    {path: 'cadastrar-contratos', component: CadastroContratosComponent},
    {path: 'editar-contrato/:id', component: EditarContratosComponent},
    {path: 'detalhar-contrato/:id', component: DetalharContratosComponent},
    {path: '', component: PaginaInicialComponent},
    {path: 'inicio', component: PaginaInicialComponent}

];
