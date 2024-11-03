import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Carro} from "../../../models/carro";
import {buildInteresse, Interesse} from "../model/interesse";

@Injectable({
  providedIn: 'root'
})
export class InteresseStateService {
  private _interesseLista = new BehaviorSubject<Interesse>(buildInteresse());
  public interesse$ = this._interesseLista.asObservable();

  constructor() {
  }

  setCarrosLista(interesse: Interesse) {
    this._interesseLista.next(interesse);
  }
}
