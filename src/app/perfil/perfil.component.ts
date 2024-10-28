import { Component, OnInit } from '@angular/core';
import {CabecalhoComponent} from "../shared/cabecalho/cabecalho.component";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [
    CabecalhoComponent
  ],
  standalone: true

})
export class PerfilComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
