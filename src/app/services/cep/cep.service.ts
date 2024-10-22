import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Endereco} from "../../models/endereco";


@Injectable({
  providedIn: 'root'
})
export class CepService {

  private readonly viaCepUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  buscaEndereco(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.viaCepUrl}/${cep}/json`);
  }
}
