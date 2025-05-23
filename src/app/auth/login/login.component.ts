declare var google: any;
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  clientId = '278793748959-a4eo6vaoc9efe8favs0hf01c474c2c9h.apps.googleusercontent.com';

  constructor() {
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: this.handleCredentialResponse.bind(this),
    });
    google.accounts.id.renderButton(
      document.getElementById("google-button"),
      { theme: "outline", size: "large", width: "100%" }
    );
  }

  async handleCredentialResponse(response: any) {
    console.log('Token ID: ', response.credential);
  }
}
