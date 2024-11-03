import {Carro} from "../../../models/carro";

export interface Interesse {
  carros: Carro[];
}

export function buildInteresse() {
  return {
    carros: []
  }
}
