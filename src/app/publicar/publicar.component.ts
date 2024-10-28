import { Component, OnInit } from '@angular/core';
import {CabecalhoComponent} from "../shared/cabecalho/cabecalho.component";

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.scss'],
  imports: [
    CabecalhoComponent
  ],
  standalone: true
})
export class PublicarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
