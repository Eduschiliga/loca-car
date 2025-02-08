import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {InformacoesUsuarioComponent} from "../../../perfil/component/informacoes-usuario/informacoes-usuario.component";
import {HttpErrorResponse} from "@angular/common/http";
import {buildUsuario, Usuario} from "../../../models/usuario";
import {UsuarioService} from "../../../services/usuario/api/usuario.service";
import {UtilsService} from "../../../utils/utils.service";
import {AuthService} from "../../../services/auth/auth.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-login-cadastrar',
  templateUrl: './login-cadastrar.component.html',
  styleUrls: ['./login-cadastrar.component.scss'],
  imports: [
    FormsModule,
    IonicModule,
    InformacoesUsuarioComponent,
    DatePipe
  ],
  standalone: true
})
export class LoginCadastrarComponent   {
  protected usuario: Partial<Usuario> | Usuario = buildUsuario();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private utils: UtilsService,
    private auth: AuthService,
  ) { }

  protected logarUsuario(): void {
    this.router.navigate(['login']);
  }

  protected async salvar() {
      this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
        {
          next: () => {
            this.utils.presentToast('bottom', 'Usuário salvo com sucesso');
            localStorage.clear();
            this.router.navigate(['/login']).then();
          },
          error: (err: HttpErrorResponse) => {
            console.log(this.usuario);
            this.utils.presentToast('bottom', 'Erro ao salvar usuário: ' + err.message);
          }
        }
      )
  }
}
