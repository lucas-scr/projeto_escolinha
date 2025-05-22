import { Component } from '@angular/core';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { PrimengImports } from '../../shared/primengImports.module';




@Component({
  selector: 'app-pagina-inicial',
  imports: [MenuLateralComponent, PrimengImports],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent {

  menuLateral: Boolean = true;

  menuToggle(){
    this.menuLateral = !this.menuLateral;
  }
}
