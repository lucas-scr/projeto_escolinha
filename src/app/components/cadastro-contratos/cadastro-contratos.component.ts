import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-cadastro-contratos',
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    FloatLabelModule,
    DatePickerModule,
    ButtonModule,
    RadioButtonModule,
    CheckboxModule,
    CardModule
  ],
  templateUrl: './cadastro-contratos.component.html',
  styleUrl: './cadastro-contratos.component.css'
})
export class CadastroContratosComponent {

  nome: String;
  autorizacaoDeImagem: Boolean;
  dataNascimento: Date;
  sexo: String;


  constructor(){

  }

  onSubmit(){

  }

}
