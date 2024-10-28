import {Component, OnDestroy, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AuthService} from "./services/auth/auth.service";
import {navigate} from "ionicons/icons";
import {TemaService} from "./services/tema/tema.service";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import {Usuario} from "./models/usuario";
import {UsuarioStateService} from "./services/usuario/state/usuario-state.service";

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit, OnDestroy {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Publicar Carro', url: '/publicar', icon: 'duplicate' },
    { title: 'Minhas publicações', url: '/publicacoesUsuario', icon: 'bookmarks' },
    { title: 'Perfil', url: '/perfil', icon: 'person' },
    { title: 'Configurações', url: '/configuracoes', icon: 'cog' },
    { title: 'Sair', url: '', icon: 'chevron-back-circle', action: 'sair' },
  ];

  mostrarMenu = false;
  public temaApp: string = "";
  usuario!: Usuario;

  constructor(
    private authService: AuthService,
    private usuarioState: UsuarioStateService,
    private temaService: TemaService
  ) {
    this.usuarioState.usuario.subscribe((usuario: Usuario) => {this.usuario = usuario;});

    this.temaService.temaAtual$.subscribe(tema => {
      this.temaApp = tema;
    });
  }

  ngOnInit(): void {
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }

  ngOnDestroy(): void {
    this.authService.mostrarMenuEmitter.unsubscribe();
  }

  navegar(page: any) {
    if (page.action == 'sair') {
      this.authService.logout();
    }
  }

  protected readonly navigate = navigate;
}
