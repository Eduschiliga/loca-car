import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";

interface BarraPesquisa {
  mostrar: boolean;
  placeholder: string;
}

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class CabecalhoComponent {
  @Input() nomePagina: string = '';
  @Input() barraPesquisa: BarraPesquisa = {mostrar: false, placeholder: 'Realize a sua pesquisa'};
  @Output() inputPesquisa = new EventEmitter();

  protected handleInput(evt: any) {
    this.inputPesquisa.emit(evt.target.value);
  }
}
