import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-cadastrar',
  templateUrl: './login-cadastrar.component.html',
  styleUrls: ['./login-cadastrar.component.scss'],
  imports: [
    FormsModule,
    IonicModule
  ],
  standalone: true
})
export class LoginCadastrarComponent   {

  constructor(
    private router: Router,
  ) { }

  protected logarUsuario(): void {
    this.router.navigate(['login']);
  }
}
