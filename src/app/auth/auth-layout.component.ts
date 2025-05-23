import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  template: `
    <div class="auth-layout">
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AuthLayoutComponent { }