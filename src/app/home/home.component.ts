import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {MenuTabsComponent} from "../shared/menu-tabs/menu-tabs.component";
import {CabecalhoComponent} from "../shared/cabecalho/cabecalho.component";
import {CommonModule} from "@angular/common";
import {CarroStateService} from "../services/carro/state/carro-state.service";
import {CarroApiService} from "../services/carro/api/carro-api.service";
import {Carro} from "../models/carro";
import {FormsModule} from "@angular/forms";
import {CardCarroComponent} from "../detalhe-carro/components/card-carro/card-carro.component";
import {Router, RouterLink} from "@angular/router";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    IonicModule,
    MenuTabsComponent,
    CabecalhoComponent,
    CommonModule,
    FormsModule,
    CardCarroComponent,
    RouterLink
  ],
  standalone: true,
})
export class HomeComponent implements OnInit, OnDestroy {
  protected carros: Carro[] = [];
  public carrosFiltrados: Carro[] = [...this.carros];

  protected loading = true;
  protected erroCarregamento = false;
  private inscricao = new Subscription();

  protected modeloMarcaFiltro: string = '';

  constructor(
    private carroState: CarroStateService,
    private carroService: CarroApiService,
    private router: Router,
  ) {
    this.inscreverStateCarro();
  }

  ngOnInit(): void {
    this.buscarTodosCarros();
  }

  protected redirecionarParaPublicao() {
    this.router.navigate(['publicar']);
  }

  private inscreverStateCarro() {
    this.inscricao.add(
      this.carroState.carros$.subscribe(
        {
          next: (carros: Carro[]) => {
            this.carros = carros;
            this.carrosFiltrados = carros;
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

  aplicarFiltros() {
    this.carrosFiltrados = this.carros;

    if (this.modeloMarcaFiltro) {
      this.temFiltroModeloMarca();
    }
  }

  private temFiltroModeloMarca() {
    this.carrosFiltrados = this.carros.filter((carro: Carro) => {
      const filtroLower = this.modeloMarcaFiltro.toLowerCase();
      return (carro.marca && carro.marca.toLowerCase().includes(filtroLower)) ||
        (carro.modelo && carro.modelo.toLowerCase().includes(filtroLower));
    });
  }

  private buscarTodosCarros() {
    this.setarLoading();
    this.inscricao.add(
      this.carroService.buscarTodos().subscribe(
        {
          next: (carros: Carro[]) => {
            this.carroState.setCarrosLista(carros);
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


  pesquisaModeloMarca(event: any) {
    this.modeloMarcaFiltro = event;
    this.aplicarFiltros();
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }


}
