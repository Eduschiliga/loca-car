import {Component, Input, OnInit} from '@angular/core';
import {buildUsuario, Usuario} from "../../../models/usuario";
import {IonicModule} from "@ionic/angular";
import {DatePipe, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UsuarioService} from "../../../services/usuario/api/usuario.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {UtilsService} from "../../../utils/utils.service";
import {AuthService} from "../../../services/auth/auth.service";
import {FirebaseService} from "../../../services/firebase/firebase.service";

@Component({
  selector: 'app-informacoes-usuario',
  templateUrl: './informacoes-usuario.component.html',
  styleUrls: ['./informacoes-usuario.component.scss'],
  imports: [
    IonicModule,
    DatePipe,
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class InformacoesUsuarioComponent implements OnInit {
  @Input() editar: boolean = false;
  @Input() msgButton: string = '';
  @Input() atualizar: boolean = false;
  @Input() mostrarEndereco: boolean = false;
  @Input() acao: string = '';

  protected usuario: Partial<Usuario> | Usuario = this.auth.usuario;
  private usuarioFirebase!: Partial<Usuario> | Usuario;
  protected isModalOpen = false;
  protected senhaNova: string = '';
  protected senhaAntiga: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private utils: UtilsService,
    private auth: AuthService,
    private firebaseService: FirebaseService
  ) {
    if (this.acao == 'cadastrar') {
      this.usuario = buildUsuario();
    }
  }

  ngOnInit(): void {
    this.setarUsuario().then();
  }

  private async setarUsuario() {
    this.usuarioFirebase = await this.auth.obterUsuario().then((user: Partial<Usuario>) => {
      return user;
    });
  }

  protected alterarSenha() {
    if (this.senhaAntiga == this.usuarioFirebase.senha) {
      this.usuario.senha = this.senhaNova;
      this.usuarioFirebase.senha = this.senhaNova;

      this.usuarioService.atualizarUsuario(this.usuario).subscribe(
        {
          next: () => {
            this.firebaseService.updateUsuario(this.usuarioFirebase);
            this.auth.logout();
            this.utils.presentToast('bottom', 'Senha alterada com sucesso').then();
          },
          error: (err: HttpErrorResponse) => {
            this.utils.presentToast('bottom', 'Erro ao alterar senha ' + err.message).then();
          }
        }
      )
    } else {
      this.utils.presentToast('bottom', 'Senha antiga incorreta').then();
    }
  }

  protected async salvar() {
    if (this.acao == 'editar') {

      this.usuario.senha = this.usuarioFirebase.senha;

      this.usuarioService.atualizarUsuario(this.usuario).subscribe(
        {
          next: () => {
            this.utils.presentToast('bottom', 'Usuário editado com sucesso');
          },
          error: (err: HttpErrorResponse) => {
            this.utils.presentToast('bottom', 'Erro ao salvar usuário: ' + err.message);
          }
        }
      )
    }

    if (this.acao == 'cadastrar') {
      this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
        {
          next: () => {
            this.utils.presentToast('bottom', 'Usuário salvo com sucesso');
            localStorage.clear();
            this.router.navigate(['/login']).then();
          },
          error: (err: HttpErrorResponse) => {
            this.utils.presentToast('bottom', 'Erro ao salvar usuário: ' + err.message);
          }
        }
      )
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
