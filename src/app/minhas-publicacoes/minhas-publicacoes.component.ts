import {Component, OnDestroy, OnInit} from '@angular/core';
import {CabecalhoComponent} from "../shared/cabecalho/cabecalho.component";
import {AlertController, IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {CarroApiService} from "../services/carro/api/carro-api.service";
import {Carro} from "../models/carro";
import {CarroStateService} from "../services/carro/state/carro-state.service";
import {Subscription} from "rxjs";
import {AuthService} from "../services/auth/auth.service";
import {UtilsService} from "../utils/utils.service";
import {CardCarroComponent} from "../detalhe-carro/components/card-carro/card-carro.component";

@Component({
  selector: 'app-minhas-publicacoes',
  templateUrl: './minhas-publicacoes.component.html',
  styleUrls: ['./minhas-publicacoes.component.scss'],
  imports: [
    CabecalhoComponent,
    IonicModule,
    CardCarroComponent
  ],
  standalone: true
})
export class MinhasPublicacoesComponent implements OnInit, OnDestroy {
  protected carros: Carro[] = [];
  private inscricao: Subscription = new Subscription();


  constructor(
    private router: Router,
    private carroService: CarroApiService,
    private carroState: CarroStateService,
    private auth: AuthService,
    private utils: UtilsService,
    private alertController: AlertController
  ) {
    this.increverState();
  }

  ngOnInit() {
    this.buscarTodos();
  }

  buscarTodos() {
    if (!this.auth.usuario.id != null && this.auth.usuario.id != undefined) {
      this.inscricao.add(
        this.carroService.buscarTodosPorId(this.auth.usuario.id).subscribe(
          {
            next: (carros: Carro[]) => {
              this.carros = carros;
            },
            error: (err) => {
              this.utils.presentToast('bottom', 'Erro ao buscar os carros! ' + err.getMessage()).then();
            }
          }
        )
      );
    }
  }

  increverState() {
    this.inscricao.add(
      this.carroState.carros$.subscribe(
        {
          next: (carros: Carro[]) => {
            this.carros = carros;
          }
        }
      )
    );
  }

  protected redirecionarParaPublicao() {
    this.router.navigate(['publicar']);
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
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
}
