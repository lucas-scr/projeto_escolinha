import { Routes } from '@angular/router';

import { CadastroAlunosComponent } from './components/alunos/cadastro-alunos/cadastro-alunos.component';
import { ListaAlunosComponent } from './components/alunos/lista-alunos/lista-alunos.component';
import { EditarAlunosComponent } from './components/alunos/editar-alunos/editar-alunos.component';
import { DetalharAlunosComponent } from './components/alunos/detalhar-alunos/detalhar-alunos.component';
import { ListaContratosComponent } from './components/contratos/lista-contratos/lista-contratos.component';
import { CadastroContratosComponent } from './components/contratos/cadastro-contratos/cadastro-contratos.component';
import { EditarContratosComponent } from './components/contratos/editar-contratos/editar-contratos.component';
import { DetalharContratosComponent } from './components/contratos/detalhar-contratos/detalhar-contratos.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { ListarAtividadesComponent } from './components/atividades/listar-atividades/listar-atividades.component';
import { EditarAtividadesComponent } from './components/atividades/editar-atividades/editar-atividades.component';
import { DetalharAtividadesComponent } from './components/atividades/detalhar-atividades/detalhar-atividades.component';
import { CadastrarAtividadesComponent } from './components/atividades/cadastrar-atividades/cadastrar-atividades.component';


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
    {path: 'inicio', component: PaginaInicialComponent},
    {path: 'atividades', component: ListarAtividadesComponent},
    {path: 'editar-atividade/:id', component: EditarAtividadesComponent},
    {path: 'detalhar-atividade/:id', component: DetalharAtividadesComponent},
    {path: 'cadastrar-atividade', component: CadastrarAtividadesComponent},

];
