import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Usuario} from '../../models/usuario';
import {UsuarioService} from "../usuario/api/usuario.service";
import {UsuarioStateService} from "../usuario/state/usuario-state.service";
import {FirebaseService} from "../firebase/firebase.service";
import {UtilsService} from "../../utils/utils.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  usuario!: Usuario | Partial<Usuario>;
  private token: string | undefined = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private usuarioState: UsuarioStateService,
    private firebaseService: FirebaseService,
    private utils: UtilsService
  ) {
  }

  fazerLogin(usuario: Partial<Usuario>) {
    this.usuarioService.loginUsuario(usuario.email!, usuario.senha!).subscribe({
      next: async (dadosUsuario: any | null) => {
        if (dadosUsuario) {
          this.usuario = dadosUsuario?.usuario;
          this.usuario.token = dadosUsuario.token;

          this.usuarioState.setUsuario(this.usuario);

          dadosUsuario.email = usuario.email!;
          dadosUsuario.senha = usuario.senha!;
          dadosUsuario.permanecerConectado = usuario.permanecerConectado!;

          this.firebaseService.adicionarUsuario(dadosUsuario);

          let user = await this.obterUsuario().then((user: Partial<Usuario>) => {
            return user;
          });

          this.usuario.senha = user?.senha;

          this.usuarioAutenticado = true;
          this.mostrarMenuEmitter.emit(true);
          this.router.navigate(['/home']);
        } else {
          this.usuarioAutenticado = false;
          this.mostrarMenuEmitter.emit(false);
        }
      },
      error: () => {
        this.usuarioAutenticado = false;
        this.mostrarMenuEmitter.emit(false);
        this.utils.presentToast('bottom', 'Usuário ou senha inválidos.');
      }
    });
  }

  isAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  logout() {
    localStorage.clear();
    this.firebaseService.deleteUsuario();
    this.usuarioAutenticado = false;
    this.mostrarMenuEmitter.emit(false);
    this.router.navigate(['/login']);
  }

  async obterUsuario(): Promise<any | undefined> {
    try {
      const usuarioSnapshot = await this.firebaseService.getUsuarioById();
      if (usuarioSnapshot?.exists()) {
        return usuarioSnapshot.data();
      } else {
        console.error("Documento do usuário não encontrado.");
        return undefined;
      }
    } catch (error) {
      console.error("Erro ao obter token:", error);
      return undefined;
    }
  }

  async verificarToken(): Promise<Observable<boolean>> {
    this.usuario = await this.obterUsuario();
    this.token = this.usuario.token;
    if (this.token) {
      return this.usuarioService.getUsuarioPorToken(this.usuario.email, this.usuario.senha).pipe(
        map((dadosUsuario: any) => {
          if (dadosUsuario) {
            this.usuario = dadosUsuario?.usuario;
            this.usuario.token = dadosUsuario.token;
            this.usuarioState.setUsuario(this.usuario);
            this.usuarioAutenticado = true;
            this.mostrarMenuEmitter.emit(true);
            return true;
          } else {
            this.usuarioAutenticado = false;
            this.mostrarMenuEmitter.emit(false);
            this.router.navigate(['/login']);
            return false;
          }
        }),
        catchError(() => {
          this.usuarioAutenticado = false;
          this.mostrarMenuEmitter.emit(false);
          this.router.navigate(['/login']);
          return of(false);
        })
      );
    }
    return of(false);
  }
}
