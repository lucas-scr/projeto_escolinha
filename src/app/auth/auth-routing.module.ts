import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './auth-layout.component';

const routes: Routes = [
  {path: '', 
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {path: 'login',
    loadComponent: () => import('./login/login.component').then(m=>m.LoginComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
