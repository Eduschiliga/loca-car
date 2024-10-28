import {Routes} from "@angular/router";
import {LoginComponent} from "./containers/login/login.component";
import {LoginCadastrarComponent} from "./containers/login-cadastrar/login-cadastrar.component";

export const loginRoute: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'cadastrar',
    component: LoginCadastrarComponent
  }
];
