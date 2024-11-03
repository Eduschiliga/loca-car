import {Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnDestroy} from '@angular/core';
import {AlertController, IonicModule} from "@ionic/angular";
import {Browser} from "@capacitor/browser";
import {Carro} from "../../../models/carro";
import {Swiper} from "swiper";
import {register} from "swiper/element/bundle";
import {alert, car, link} from "ionicons/icons";
import {CurrencyPipe, DecimalPipe, JsonPipe, NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {InteresseApiService} from "../../../services/interesse/api/interesse-api.service";
import {InteresseStateService} from "../../../services/interesse/state/interesse-state.service";
import {Interesse} from "../../../services/interesse/model/interesse";
import {UtilsService} from "../../../utils/utils.service";
import {Subscription} from "rxjs";

register();

@Component({
  selector: 'app-card-carro',
  templateUrl: './card-carro.component.html',
  styleUrls: ['./card-carro.component.scss'],
  imports: [
    IonicModule,
    JsonPipe,
    CurrencyPipe,
    DecimalPipe,
    NgForOf
  ],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardCarroComponent implements OnDestroy {
  @Input() carro!: Carro;
  @Input() demonstrarInteresse: boolean = true;
  @Input() conversarComDono: boolean = false;
  @Input() removerInteresse: boolean = false;

  private inscricao = new Subscription();
  protected isModalOpen = false;
  protected URL_IMG = 'assets/';

  public swiper!: Swiper;

  constructor(
    public alertCtrl: AlertController,
    private http: HttpClient,
    private utils: UtilsService,
    private interesseApi: InteresseApiService,
    private interesseState: InteresseStateService,
  ) {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async doAlertNoticiaLink() {
    let alert = await this.alertCtrl.create({
      header: "Notícia",
      message: "Link indiponível.",
      buttons: ["Ok"],
    });
    await alert.present();
  }

  protected demonstrarInteresseCarro() {
    this.inscricao.add(
      this.interesseApi.adicionarCarro(this.carro).subscribe(
        {
          next: (interesse: Interesse) => {
            this.interesseState.setCarrosLista(interesse);
            this.utils.presentToast('top', 'Interesse demonstrado!', 1500);
          },
          error: async (err) => {
            const alert = await this.alertCtrl.create({
              header: "Atenção",
              message:
                "Ocorreu um problema ao remover o interesse, tente novamente mais tarde.",
              buttons: [
                {
                  text: "OK",
                  role: "confirm"
                },
              ],
            });

            await alert.present();
          }
        }
      )
    );

  }

  protected async alertRemoverCarroInteresse(id: number) {
    const alert = await this.alertCtrl.create({
      header: "Remover Interesse",
      message: "Tem certeza que deseja remover o interesse neste carro?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Remover",
          role: "confirm",
          handler: () => {
            this.removerCarroInteresse(id);
          },
        },
      ],
    });

    await alert.present();
  }

  private removerCarroInteresse(id: number) {
    this.inscricao.add(
      this.interesseApi.removerPorId(id).subscribe(
        {
          next: (interesse: Interesse) => {
            this.interesseState.setCarrosLista(interesse);
            this.utils.presentToast('top', 'Interesse removido!', 1500);
          },
          error: async (err) => {
            const alert = await this.alertCtrl.create({
              header: "Atenção",
              message:
                "Ocorreu um problema ao remover o interesse, tente novamente mais tarde.",
              buttons: [
                {
                  text: "OK",
                  role: "confirm"
                },
              ],
            });

            await alert.present();
          }
        }
      )
    );
  }

  async presentAlertaSiteExterno(link: string | undefined) {
    const URL_WHATS = `https://api.whatsapp.com/send?phone=${link}`;
    const alert = await this.alertCtrl.create({
      header: "Atenção",
      message:
        "Você será redirecionado para um site externo. Deseja continuar?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "OK",
          role: "confirm",
          handler: () => {
            this.abrirLink(URL_WHATS);
          },
        },
      ],
    });

    await alert.present();
  }

  async abrirLink(link: string) {
    if (link === "") {
      await this.doAlertNoticiaLink();
    } else {
      if (!link.includes("http")) {
        link = `https://${link}`;
      }
      await Browser.open({url: link});
    }
  }


  protected readonly car = car;

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
