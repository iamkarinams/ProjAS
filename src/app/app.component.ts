import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent], 
  templateUrl: './app.component.html',
  template: `<app-login></app-login>`,
  styles: [`
    h1 {
      color: #369;
      font-family: Arial, Helvetica, sans-serif;
      text-align: center;
    }
  `]
})
export class AppComponent {}