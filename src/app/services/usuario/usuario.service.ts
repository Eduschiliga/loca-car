import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Usuario} from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly usuarioUrl = '/assets/mock-usuario.json';

  constructor(private http: HttpClient) {}

  getUsuario(email: string, senha: string): Observable<Usuario | null> {
    return this.http.get<Usuario>(this.usuarioUrl).pipe(
      map((usuario: Usuario) => (usuario.email === email && usuario.senha == senha ? usuario : null)),
      catchError(() => of(null))
    );
  }

  getUsuarioPorToken(token: string): Observable<Usuario | null> {
    if (!token) {
      return of(null);
    }

    return this.http.get<Usuario>(`${this.usuarioUrl}?token=${token}`).pipe(
      map((usuario: Usuario) => {
        return usuario.token == token ? usuario : null;
      }),
      catchError((error) => {
        return of(null);
      })
    );
  }
}
