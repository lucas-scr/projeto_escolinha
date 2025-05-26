import { Routes } from '@angular/router';

import { ListaAlunosComponent } from './pages/alunos/lista-alunos/lista-alunos.component';
import { DetalharAlunosComponent } from './pages/alunos/detalhar-alunos/detalhar-alunos.component';
import { ListaContratosComponent } from './pages/contratos/lista-contratos/lista-contratos.component';
import { CadastroContratosComponent } from './pages/contratos/cadastro-contratos/cadastro-contratos.component';
import { EditarContratosComponent } from './pages/contratos/editar-contratos/editar-contratos.component';
import { DetalharContratosComponent } from './pages/contratos/detalhar-contratos/detalhar-contratos.component';
import { PaginaPrincipalComponent } from './pages/pagina-principal/pagina-principal.component';
import { ListarAtividadesComponent } from './pages/atividades/listar-atividades/listar-atividades.component';
import { EditarAtividadesComponent } from './pages/atividades/editar-atividades/editar-atividades.component';
import { DetalharAtividadesComponent } from './pages/atividades/detalhar-atividades/detalhar-atividades.component';
import { CadastrarAtividadesComponent } from './pages/atividades/cadastrar-atividades/cadastrar-atividades.component';
import { ListarPagamentosComponent } from './pages/pagamentos/listar-pagamentos/listar-pagamentos.component';
import { EditarPagamentosComponent } from './pages/pagamentos/editar-pagamentos/editar-pagamentos.component';
import { DetalharPagamentosComponent } from './pages/pagamentos/detalhar-pagamentos/detalhar-pagamentos.component';
import { CadastrarPagamentosComponent } from './pages/pagamentos/cadastrar-pagamentos/cadastrar-pagamentos.component';
import { PaginaProtegidaComponent } from './pages/pagina-protegida/pagina-protegida.component';
//import { AuthGuard } from './core/guards/auth.guard';


export const routes: Routes = [
    {
        path: '', component: PaginaPrincipalComponent, canActivate: [], children: [
            { path: 'alunos', component: ListaAlunosComponent },
            { path: 'detalhar-aluno/:id', component: DetalharAlunosComponent },
            { path: 'contratos', component: ListaContratosComponent },
            { path: 'cadastrar-contratos', component: CadastroContratosComponent },
            { path: 'editar-contrato/:id', component: EditarContratosComponent },
            { path: 'detalhar-contrato/:id', component: DetalharContratosComponent },
            { path: 'atividades', component: ListarAtividadesComponent },
            { path: 'editar-atividade/:id', component: EditarAtividadesComponent },
            { path: 'detalhar-atividade/:id', component: DetalharAtividadesComponent },
            { path: 'cadastrar-atividade', component: CadastrarAtividadesComponent },
            { path: 'pagamentos', component: ListarPagamentosComponent },
            { path: 'editar-pagamento/:id', component: EditarPagamentosComponent },
            { path: 'detalhar-pagamento/:id', component: DetalharPagamentosComponent },
            { path: 'cadastrar-pagamento', component: CadastrarPagamentosComponent },
            { path: 'forbidden', component: PaginaProtegidaComponent }

        ]
    },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: '**', redirectTo: 'auth/login' }
];

