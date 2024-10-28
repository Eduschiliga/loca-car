import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {AlertController, IonicModule} from "@ionic/angular";
import {Browser} from "@capacitor/browser";
import {Carro} from "../../../models/carro";
import  {Swiper} from "swiper";
import {register} from "swiper/element/bundle";
import {car} from "ionicons/icons";
import {CurrencyPipe, DecimalPipe, JsonPipe, NgForOf} from "@angular/common";

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
export class CardCarroComponent  {
  @Input() carro!: Carro;
  protected isModalOpen = false;
  protected URL_IMG = 'assets/';

  public swiper!: Swiper;

  constructor(
      public alertCtrl: AlertController,
  ) { }

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
}
