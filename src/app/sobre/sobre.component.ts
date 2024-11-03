import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CabecalhoComponent } from "../shared/cabecalho/cabecalho.component";

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss'],
  standalone:true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [CabecalhoComponent]
})
export class SobreComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
