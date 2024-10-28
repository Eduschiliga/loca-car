import {Usuario} from "./usuario";

export interface Carro {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  preco: number;
  quilometragem: number;
  tipoCombustivel: 'Gasolina' | 'Diesel' | 'Elétrico' | 'Híbrido';
  transmissao: 'Manual' | 'Automática' | 'CVT';
  cor: string;
  localizacao: {
    cidade: string;
    estado: string;
    pais: string;
    endereco: string;
  };
  motor: {
    potencia: number;
    cilindrada: number;
  };
  status: 'Disponível' | 'Alugado' | 'Vendido';
  imagens: string[];
  descricao: string;
  caracteristicas: string[];
  usuario: Usuario;
  dataCriacao: Date;
  dataAtualizacao: Date;
}
