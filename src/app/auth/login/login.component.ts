declare var google: any;
import { Component, OnInit } from '@angular/core';
import { environments } from '../../../environments/environments';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  clientId = environments.googleClientId;

  constructor() {
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: this.handleCredentialResponse.bind(this),
    });
    google.accounts.id.renderButton(
      document.getElementById("google-button"),
      { theme: "filled-blue", size: "large", width: "100%" }
    );
  }

  async handleCredentialResponse(response: any) {
    console.log('Token ID: ', response.credential);
  }
}
