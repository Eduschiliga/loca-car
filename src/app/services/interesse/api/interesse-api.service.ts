import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from "rxjs";
import { Carro } from "../../../models/carro";
import {catchError, map} from "rxjs/operators";
import { Interesse } from "../model/interesse";

@Injectable({
  providedIn: 'root'
})
export class InteresseApiService {
  private readonly API = 'assets/mock-interesse.json';

  constructor(private http: HttpClient) { }

  buscarTodos(): Observable<Interesse> {
    return this.http.get<Interesse>(this.API);
  }

  buscarPorId(id: number): Observable<boolean> {
    return this.http.get<Interesse>(this.API).pipe(
      map((interesse: Interesse) => interesse.carros.some((carro: Carro) => carro.id === id))
    );
  }

  removerPorId(id: number): Observable<Interesse> {
    return this.http.get<Interesse>(this.API).pipe(
      map((interesse: Interesse) => {
        interesse.carros = interesse.carros.filter((carro: Carro) => carro.id !== id);
        return interesse;
      })
    );
  }

  adicionarCarro(novoCarro: Carro): Observable<Interesse> {
    return this.http.get<Interesse>(this.API).pipe(
      map((interesse: Interesse) => {
        const carroExistente = interesse.carros.some((carro: Carro) => carro.id === novoCarro.id);
        if (!carroExistente) {
          interesse.carros.push(novoCarro);
        }
        return interesse;
      })
    );
  }
}
