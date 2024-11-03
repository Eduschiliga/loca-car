import { Component, OnInit } from '@angular/core';
import {CabecalhoComponent} from "../shared/cabecalho/cabecalho.component";
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-minhas-publicacoes',
  templateUrl: './minhas-publicacoes.component.html',
  styleUrls: ['./minhas-publicacoes.component.scss'],
    imports: [
        CabecalhoComponent,
        IonicModule
    ],
  standalone: true
})
export class MinhasPublicacoesComponent  implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  protected redirecionarParaPublicao() {
    this.router.navigate(['publicar']);
  }

}
