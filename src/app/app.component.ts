import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaAlunosComponent } from './components/lista-alunos/lista-alunos.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CardModule } from 'primeng/card';



@Component({
  selector: 'app-root',
  imports: [
    ListaAlunosComponent,
    MenuLateralComponent,
    AvatarModule,
    OverlayBadgeModule,
    CardModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto_escolinha';
}
