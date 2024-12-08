import {Injectable} from '@angular/core';
import {Usuario} from "../../models/usuario";
import {addDoc, collection, deleteDoc, doc, Firestore, getDoc, updateDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public idFirebase = localStorage.getItem('idFirebase');

  constructor(private firestore: Firestore) {
  }

  getUsuarioById() {
    if (this.idFirebase !== null) {
      const usuarioRef = doc(this.firestore, 'usuario', this.idFirebase.toString());
      return getDoc(usuarioRef);
    } else {
      return null;
    }
  }

  adicionarUsuario(usuario: Partial<Usuario>) {
    const loginRef = collection(this.firestore, 'usuario');

    const usuarioSend = {
      email: usuario.email,
      senha: usuario.senha,
      token: usuario.token,
      permanecerConectado: usuario.permanecerConectado
    };

    addDoc(loginRef, usuarioSend).then((docRef) => {
      localStorage.setItem('idFirebase', docRef.id);
    });
  }

  deleteUsuario() {
    const usuarioRef = doc(this.firestore, `usuario/${this.idFirebase}`);
    deleteDoc(usuarioRef);
  }

  updateUsuario(usuario: Partial<Usuario>): boolean {
    if (this.idFirebase !== null) {
      let sucesso = false;
      const usuarioRef = doc(this.firestore, 'usuario', this.idFirebase.toString());
      updateDoc(usuarioRef, usuario)
        .then(() => {
          sucesso = true;
        })
        .catch(() => {
          sucesso = false;
        });

      return sucesso;
    }
    return false;
  }
}
