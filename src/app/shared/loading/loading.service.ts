import { Injectable } from '@angular/core';
import {LoadingController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private loadingCtrl: LoadingController
  ) { }

  async showLoading(msg: string = 'Carregando...') {
    const loading = await this.loadingCtrl.create({
      message: msg,
      spinner: 'bubbles',
    });

    await loading.present();

    return loading;
  }
}
