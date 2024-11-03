import {Component, OnDestroy, OnInit} from '@angular/core';
import {CabecalhoComponent} from "../../../shared/cabecalho/cabecalho.component";
import {IonicModule} from "@ionic/angular";
import {CardCarroComponent} from "../../../detalhe-carro/components/card-carro/card-carro.component";
import {Carro} from "../../../models/carro";
import {HttpClient} from "@angular/common/http";
import {CarroStateService} from "../../../services/carro/state/carro-state.service";
import {CarroApiService} from "../../../services/carro/api/carro-api.service";
import {Router} from "@angular/router";
import {buildInteresse, Interesse} from "../../../services/interesse/model/interesse";
import {InteresseStateService} from "../../../services/interesse/state/interesse-state.service";
import {InteresseApiService} from "../../../services/interesse/api/interesse-api.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-interesse',
  templateUrl: './interesse.component.html',
  styleUrls: ['./interesse.component.scss'],
  imports: [
    CabecalhoComponent,
    IonicModule,
    CardCarroComponent
  ],
  standalone: true
})
export class InteresseComponent  implements OnInit, OnDestroy {

  protected interesses: Interesse = buildInteresse();
  protected carros: Carro[] = [];

  protected loading = true;
  protected erroCarregamento = false;
  private inscricao = new Subscription();

  constructor(
    private interesseState: InteresseStateService,
    private interesseApi: InteresseApiService,
  ) {
    this.inscreverStateCarro();
  }

  ngOnInit(): void {
    this.buscarTodosCarros();
  }

  private buscarTodosCarros() {
    this.setarLoading();
    this.inscricao.add(
      this.interesseApi.buscarTodos().subscribe(
        {
          next: (interesses: Interesse) => {
            this.interesseState.setCarrosLista(interesses);
          },
          error: () => {
            this.setarErro();
          },
          complete: () => {
            this.setarLoadingCompleto();
          }
        }
      )
    );
  }

  private inscreverStateCarro() {
    this.inscricao.add(
      this.interesseState.interesse$.subscribe(
        {
          next: (interesses: Interesse) => {
            this.interesses = interesses;
          },
          error: () => {
            this.setarErro();
          }
        }
      )
    );

  }

  private setarErro() {
    this.loading = false;
    this.erroCarregamento = true;
  }

  private setarLoadingCompleto() {
    this.loading = false;
    this.erroCarregamento = false;
  }

  private setarLoading() {
    this.loading = true;
    this.erroCarregamento = false;
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

}
