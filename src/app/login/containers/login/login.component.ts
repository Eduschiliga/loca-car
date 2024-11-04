import {Component, OnInit} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {Usuario} from '../../../models/usuario';
import {AuthService} from '../../../services/auth/auth.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingService} from "../../../shared/loading/loading.service";
import {Subscription} from "rxjs";

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
export class LoginComponent implements OnInit {
  usuario: Partial<Usuario> = {
    email: '',
    senha: '',
    permanecerConectado: false
  };

  private inscricao = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
  ) {
  }

  ngOnInit() {
    this.verificarUsuarioAutenticadoComToken();
  }

  private async verificarUsuarioAutenticadoComToken() {
    const token = this.authService.obterToken();

    if (token) {
      const loading = await this.loadingService.showLoading('Autenticando Usuário...');

      this.inscricao.add(
        this.authService.verificarToken().subscribe({
          next: (autenticado) => {
            if (autenticado) {
              this.router.navigate(['/home']);
            }
          },
          error: () => {
            this.router.navigate(['/login']);
            loading.dismiss();
          },
          complete: () => {
            loading.dismiss();
          }
        })
      );
    }
  }

  protected login(): void {
    this.authService.fazerLogin(this.usuario);
  }

  protected registrarUsuario(): void {
    this.router.navigate(['login/cadastrar']);
  }
}
