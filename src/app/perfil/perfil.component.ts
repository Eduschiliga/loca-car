import {Component, OnInit} from '@angular/core';
import {CabecalhoComponent} from "../shared/cabecalho/cabecalho.component";
import {AuthService} from "../services/auth/auth.service";
import {IonicModule} from "@ionic/angular";
import {JsonPipe, KeyValuePipe} from "@angular/common";
import {Usuario} from "../models/usuario";
import {InformacoesUsuarioComponent} from "./component/informacoes-usuario/informacoes-usuario.component";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [
    CabecalhoComponent,
    IonicModule,
    JsonPipe,
    KeyValuePipe,
    InformacoesUsuarioComponent
  ],
  standalone: true

})
export class PerfilComponent {
  protected usuario: Usuario = this.auth.usuario;
  protected readonly Object = Object;
  protected isModalOpen = false;

  constructor(
    private auth: AuthService,
  ) {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
