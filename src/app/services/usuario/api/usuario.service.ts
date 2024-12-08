import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

import {Usuario} from '../../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly URL_SIGNUP = 'http://localhost:20001/api/auth/signup';
  private readonly URL_LOGIN = 'http://localhost:20001/api/auth/login';

  private readonly URL_USUARIO = 'http://localhost:20001/api/user';

  constructor(
    private http: HttpClient,
  ) {
  }

  getUsuarioPorEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.URL_USUARIO + '/' + email);
  }

  cadastrarUsuario(usuario: Partial<Usuario>): Observable<Partial<Usuario>> {
    return this.http.post<Partial<Usuario>>(this.URL_SIGNUP, usuario);
  }

  atualizarUsuario(usuario: Partial<Usuario>): Observable<Partial<Usuario>> {
    return this.http.put<Partial<Usuario>>(this.URL_USUARIO + '/' + usuario.id, usuario);
  }

  loginUsuario(email: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(this.URL_LOGIN, {email, senha});
  }

  getUsuarioPorToken(email: string | undefined, senha: string | undefined): Observable<Usuario | Partial<Usuario> | null | undefined> {

    if (email && senha) {
      return this.loginUsuario(email, senha);
    } else {
      return of(null);
    }
  }
}
