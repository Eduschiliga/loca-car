import { Component, OnInit } from '@angular/core';
import {CabecalhoComponent} from "../shared/cabecalho/cabecalho.component";

@Component({
  selector: 'app-minhas-publicacoes',
  templateUrl: './minhas-publicacoes.component.html',
  styleUrls: ['./minhas-publicacoes.component.scss'],
  imports: [
    CabecalhoComponent
  ],
  standalone: true
})
export class MinhasPublicacoesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
