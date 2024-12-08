import {Endereco} from "./endereco";

export interface Usuario {
  id?: number,
  expiresIn?: number,
  token?: string;
  nome: string;
  email: string;
  senha: string;
  permanecerConectado?: boolean;
  dataNascimento: string;
  endereco?: Endereco | null;
  telefone: string;
}

export function buildUsuario(): Partial<Usuario> {
  return {
    nome: '',
    email: '',
    senha: '',
    dataNascimento: '',
    telefone: '',
  };
}
