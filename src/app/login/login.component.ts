import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Usuario} from "../models/usuario";
import {AuthService} from "../services/auth.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonicModule,
    FormsModule
  ],
  standalone: true
})
export class LoginComponent   {
  protected usuario: Usuario = {nome: '', senha: ''};

  constructor(
    private authService: AuthService
  ) { }

  login() {
    this.authService.fazerLogin(this.usuario);
  }

}
