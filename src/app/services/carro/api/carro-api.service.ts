import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Carro} from "../../../models/carro";

@Injectable({
  providedIn: 'root'
})
export class CarroApiService {
  private readonly API = 'http://localhost:20001/api/car';


  constructor(
    private http: HttpClient,
  ) {
  }

  buscarTodos(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.API);
  }

  criar(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(this.API, carro);
  }
}
