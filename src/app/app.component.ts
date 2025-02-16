import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe o CommonModule
import { RouterOutlet } from '@angular/router';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';





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

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto_escolinha';


  menuLateral: Boolean = true;

  menuToggle(){
    this.menuLateral = !this.menuLateral;
  }
}
