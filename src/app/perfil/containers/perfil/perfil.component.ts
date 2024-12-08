import {Component} from '@angular/core';
import {CabecalhoComponent} from "../../../shared/cabecalho/cabecalho.component";
import {IonicModule} from "@ionic/angular";
import {InformacoesUsuarioComponent} from "../../component/informacoes-usuario/informacoes-usuario.component";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [
    CabecalhoComponent,
    IonicModule,
    InformacoesUsuarioComponent
  ],
  standalone: true

})
export class PerfilComponent {
  protected readonly Object = Object;
  protected isModalOpen = false;
  protected loading = true;

  constructor() {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
