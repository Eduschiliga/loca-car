import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Usuario} from "../../../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioStateService {
  private usuario$ = new BehaviorSubject<Usuario>({
    telefone: "",
    dataNascimento: "",
    email: "",
    endereco:  {
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: '',
    },
    nome: "",
    permanecerConectado: false,
    senha: "",
    token: ""
  });

  usuario = this.usuario$.asObservable();

  setUsuario(usuario: Usuario) {
    this.usuario$.next(usuario);
  }

  constructor() { }
}
