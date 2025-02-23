import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe o CommonModule
import { RouterOutlet } from '@angular/router';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ServiceMensagemGlobal } from './services/mensagens_global';
import {MockDbAlunosService } from './mocks/mockDbAlunos'
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ServiceAlunos } from './services/service_alunos';



@Component({
  selector: 'app-root',
  imports: [
    MenuLateralComponent,
    AvatarModule,
    OverlayBadgeModule,
    CardModule,
    RouterOutlet,
    CommonModule,
    ToastModule,
    InMemoryWebApiModule,
  

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[
    ServiceMensagemGlobal,
    ServiceAlunos
  ]
})
export class AppComponent {
  title = 'projeto_escolinha';


  menuLateral: Boolean = true;

  menuToggle(){
    this.menuLateral = !this.menuLateral;
  }
}
