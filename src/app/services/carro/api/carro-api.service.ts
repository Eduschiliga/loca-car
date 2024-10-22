import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Carro} from "../../../models/carro";

@Injectable({
  providedIn: 'root'
})
export class CarroApiService {
  private readonly API = 'assets/mock-carro.json';


  constructor(
    private http: HttpClient,
  ) { }

  buscarTodos(): Observable<Carro[]> {
   return this.http.get<Carro[]>(this.API);
  }

  buscarPorId(id: number): Observable<Carro | undefined> {
    return this.http.get<Carro[]>(this.API).pipe(
      map((carros: Carro[]) => carros.find(carro => carro.id === id))
    );
  }
}
