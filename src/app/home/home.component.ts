import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertController, IonicModule} from "@ionic/angular";
import {CabecalhoComponent} from "../shared/cabecalho/cabecalho.component";
import {CommonModule} from "@angular/common";
import {CarroStateService} from "../services/carro/state/carro-state.service";
import {CarroApiService} from "../services/carro/api/carro-api.service";
import {Carro} from "../models/carro";
import {FormsModule} from "@angular/forms";
import {CardCarroComponent} from "../detalhe-carro/components/card-carro/card-carro.component";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UtilsService} from "../utils/utils.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    IonicModule,
    CabecalhoComponent,
    CommonModule,
    FormsModule,
    CardCarroComponent
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
    private utils: UtilsService,
    private alertController: AlertController
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
            console.log(carros)
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

  editar(event: number) {
    this.router.navigate(['/publicar/editar', event]);
  }

  async remover(event: number) {
    const alert = await this.alertController.create({
      header: "Atenção",
      message:
        "Deseja realmente excluir esta publicação?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "OK",
          role: "confirm",
          handler: () => {
            this.inscricao.add(
              this.carroService.deletar(event).subscribe(
                {
                  next: () => {
                    this.utils.presentToast('bottom', 'Carro deletado com sucesso! ').then();

                    let temp = this.carros.filter((carro: Carro) => {
                      return carro.id != event;
                    })

                    this.carroState.setCarrosLista(temp);
                  },
                  error: (err) => {
                    this.utils.presentToast('bottom', 'Erro ao deletar o carro! ' + err.getMessage()).then();
                  }
                }
              )
            );
          },
        },
      ],
    });

    await alert.present();

  }


  pesquisaModeloMarca(event: any) {
    this.modeloMarcaFiltro = event;
    this.aplicarFiltros();
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }


}
