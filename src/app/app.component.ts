import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaAlunosComponent } from './components/lista-alunos/lista-alunos.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ListaAlunosComponent

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto_escolinha';
}
