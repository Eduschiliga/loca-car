import { Component, OnInit } from '@angular/core';
import {CabecalhoComponent} from "../shared/cabecalho/cabecalho.component";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.scss'],
  imports: [
    CabecalhoComponent,
    IonicModule
  ],
  standalone: true
})
export class PublicarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
