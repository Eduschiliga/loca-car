import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Carro} from "../../../models/carro";

@Injectable({
  providedIn: 'root'
})
export class CarroStateService {
  private _carrosLista = new BehaviorSubject<Carro[]>([]);
  public carros$ = this._carrosLista.asObservable();

  constructor() {
  }

  setCarrosLista(carros: Carro[]) {
    this._carrosLista.next(carros);
  }
}
