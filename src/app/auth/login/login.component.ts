declare var google: any;
import { Component, OnInit } from '@angular/core';
import { environments } from '../../environments/environments';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  // remover depois que testar
  API_BACKEND: string = 'http://localhost:8080/api/auth/google'
  user: any = null;
  clientId = environments.googleClientId;
  tokenGoogle: string = '';

  constructor(private auth: AuthService, private router: Router) {
  }


  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: this.handleCredentialResponse.bind(this),
    });

    google.accounts.id.prompt();

    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "filled-blue", size: "large", width: "100%" }
    );
  }

  handleCredentialResponse(response: any) {
    this.tokenGoogle = response.credential;
    console.log(this.tokenGoogle)

    const payload = this.decodeJwt(this.tokenGoogle);
    this.user = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture
    };
    console.log("Logado");
    this.acessarBackend();

    this.auth.loginWithGoogle(this.tokenGoogle).subscribe({
    next: (res) => console.log('Logado!', res),
    error: (err) => console.error('Erro ao logar:', err)
    })
  }


  decodeJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));

    return JSON.parse(jsonPayload);
  }

  acessarBackend() {
    fetch(this.API_BACKEND, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: this.tokenGoogle
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na autenticação com o backend');
        }
        return response.json();
      })
      .then(data => {
        console.log('Resposta do backend:', data);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }


}
