import { Component, OnInit } from '@angular/core';
import {CabecalhoComponent} from "../shared/cabecalho/cabecalho.component";

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
  imports: [
    CabecalhoComponent
  ],
  standalone: true
})
export class ConfiguracoesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
