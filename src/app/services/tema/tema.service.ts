import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  private temaAtual = new BehaviorSubject<string>('light');
  public temaAtual$: Observable<string> = this.temaAtual.asObservable();

  constructor(private platform: Platform) {
    this.determinarTemaInicial();
    this.monitorarMudancaTema();
  }

  private determinarTemaInicial() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.temaAtual.next(prefersDark.matches ? 'dark' : 'light');
  }

  private monitorarMudancaTema() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.temaAtual.next(e.matches ? 'dark' : 'light');
    });

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.determinarTemaInicial();
    });
  }
}
