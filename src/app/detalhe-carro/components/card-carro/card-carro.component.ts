import {Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnDestroy} from '@angular/core';
import {AlertController, IonicModule} from "@ionic/angular";
import {Browser} from "@capacitor/browser";
import {Carro} from "../../../models/carro";
import {Swiper} from "swiper";
import {register} from "swiper/element/bundle";
import {car} from "ionicons/icons";
import {CurrencyPipe, DecimalPipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {UtilsService} from "../../../utils/utils.service";
import {Subscription} from "rxjs";

register();

@Component({
  selector: 'app-card-carro',
  templateUrl: './card-carro.component.html',
  styleUrls: ['./card-carro.component.scss'],
  imports: [
    IonicModule,
    CurrencyPipe,
    DecimalPipe
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
