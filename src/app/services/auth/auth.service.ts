import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Usuario } from '../../models/usuario';
import { UsuarioService } from "../usuario/usuario.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
  ) {
    this.verificarToken().subscribe();
  }

  fazerLogin(usuario: Partial<Usuario>) {
    this.usuarioService.getUsuario(usuario.email!, usuario.senha!).subscribe({
      next: (dadosUsuario: Usuario | null) => {
        if (dadosUsuario) {
          if (usuario.permanecerConectado) {
            const tokenDeAcesso = 'faketoken1234567890';
            localStorage.setItem('tokenDeAcesso', tokenDeAcesso);
          }
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
      }
    });
  }

  isAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  logout() {
    localStorage.clear();
    this.usuarioAutenticado = false;
    this.mostrarMenuEmitter.emit(false);
    this.router.navigate(['/login']);
  }

  obterToken(): string | null {
    return localStorage.getItem('tokenDeAcesso');
  }

  verificarToken(): Observable<boolean> {
    const token = this.obterToken();
    if (token) {
      return this.usuarioService.getUsuarioPorToken(token).pipe(
        map((dadosUsuario: Usuario | null) => {
          if (dadosUsuario) {
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
