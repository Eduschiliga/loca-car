import { Endereco } from "./endereco";

export interface Usuario {
  nome: string;
  email: string;
  senha: string;
  permanecerConectado?: boolean;
  dataNascimento: string;
  endereco: Endereco;
  token?: string;
  telefone: string;
}

export function buildUsuario(): Usuario {
  return {
    nome: '',
    email: '',
    senha: '',
    permanecerConectado: false,
    dataNascimento: '',
    endereco: { cep: '', logradouro: '', complemento: '', bairro: '', localidade: '', uf: ''},
    token: '',
    telefone: ''
  };
}
