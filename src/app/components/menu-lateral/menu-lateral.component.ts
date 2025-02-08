import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-menu-lateral',
  imports: [
    MenuModule,
    BadgeModule,
    RippleModule,
    AvatarModule

  ],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})

export class MenuLateralComponent implements OnInit  {

  menu: MenuItem[] | undefined;

  ngOnInit(){
    this.menu = [
      {
        separator: true
      },
      {
        label: "Aula",
        items: [
          {
          label: 'Alunos',
          icon: 'pi pi-user',
        },
        {
          label: 'Responsáveis',
          icon: 'pi pi-plus',
        },
        {
          label: 'Atividades',
          icon: 'pi pi-book',
        }
      ]
      },
      {
        label: "Administrativo",
        items: [
          {
          label: 'Pagamentos',
          icon: 'pi pi-dollar',
        },
        {
          label: 'Cronograma',
          icon: 'pi pi-calendar-clock',
        }
      ]
      }
    ]

  }

}
