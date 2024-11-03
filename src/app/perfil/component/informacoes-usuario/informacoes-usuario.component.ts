import {Component, Input, OnInit} from '@angular/core';
import {buildUsuario, Usuario} from "../../../models/usuario";
import {IonicModule} from "@ionic/angular";
import {DatePipe, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-informacoes-usuario',
  templateUrl: './informacoes-usuario.component.html',
  styleUrls: ['./informacoes-usuario.component.scss'],
  imports: [
    IonicModule,
    DatePipe,
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class InformacoesUsuarioComponent {
  @Input() usuario: Usuario = buildUsuario();
  @Input() editar: boolean = false;
  @Input() msgButton: string = '';
  @Input() atualizar: boolean = false;

  protected readonly Object = Object;
  protected isModalOpen = false;

  constructor() { }

  protected salvar() {

  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
