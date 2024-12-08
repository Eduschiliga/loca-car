import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from '@angular/router';
import {Subscription} from "rxjs";

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
  @Input() mostrarInteresse: boolean = false;

  @Output() inputPesquisa = new EventEmitter();

  private inscricao = new Subscription();

  constructor(
    private router: Router,
  ) {
  }


  protected handleInput(evt: any) {
    this.inputPesquisa.emit(evt.target.value);
  }

  redirecionarInteresse() {
    this.router.navigate(['/interesse']);
  }

}
