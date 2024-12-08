import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Carro} from "../../../models/carro";

@Injectable({
  providedIn: 'root'
})
export class CarroApiService {
  private readonly API = 'http://localhost:20001/api/car';
  private readonly API_CARIMAGE = 'http://localhost:20001/api/carimage';
  private readonly API_IMG = 'http://localhost:20001/api/image';


  constructor(
    private http: HttpClient,
  ) {
  }

  buscarTodosPorId(id: number): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.API + '/user/' + id);
  }

  buscarTodos(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.API);
  }

  criar(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(this.API, carro);
  }

  enviarImagem(file: FormData){
    return this.http.post<any>(this.API_IMG, file);
  }

  enviarImagemComCarro(carroImg: any){
    return this.http.post<any>(this.API_CARIMAGE, carroImg);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(this.API + '/' + id);
  }

  editar(carro: Carro): Observable<Carro> {
    return this.http.put<Carro>(this.API + '/' + carro.id, carro);
  }

  buscarPorId(id: number): Observable<Carro> {
    return this.http.get<Carro>(this.API + '/' + id);
  }
}
