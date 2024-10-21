import {Endereco} from "./endereco";

export interface Usuario {
  nome: string;
  email: string;
  senha: string;
  permanecerConectado?: boolean;
  dataNascimento: string;
  endereco: Endereco;
  token?: string;
}

