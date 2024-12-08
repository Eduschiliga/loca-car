import {Usuario} from "./usuario";

export interface Carro {
  id?: number;
  marca: string;
  modelo: string;
  ano?: number;
  preco?: number;
  quilometragem?: number;
  tipoCombustivel: string;
  transmissao: string;
  cor: string;
  potencia?: number;
  status: string;
  descricao: string;
  usuario?: Usuario;
  dataCriacao: Date | string;
  dataAtualizacao: Date | string;
}

export function buildCarro() {
  return {
    marca: '',
    modelo: '',
    tipoCombustivel: '',
    transmissao: '',
    cor: '',
    status: '',
    descricao: '',
    dataCriacao: new Date(),
    dataAtualizacao: new Date(),
  }
}

