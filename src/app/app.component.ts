import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from "./services/auth/auth.service";
import {navigate} from "ionicons/icons";
import {TemaService} from "./services/tema/tema.service";
import {register} from 'swiper/element/bundle';
import {Usuario} from "./models/usuario";
import {UsuarioStateService} from "./services/usuario/state/usuario-state.service";
import {filter, Subscription} from "rxjs";

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    CommonModule,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  public appPages = [
    {title: 'Home', url: '/home', icon: 'home'},
    {title: 'Publicar Carro', url: '/publicar', icon: 'duplicate'},
    {title: 'Minhas publicações', url: '/publicacoesUsuario', icon: 'bookmarks'},
    {title: 'Perfil', url: '/perfil', icon: 'person'},
    // {title: 'Configurações', url: '/configuracoes', icon: 'cog'},
    {title: 'Sobre', url: '/sobre', icon: 'ellipsis-horizontal'},
    {title: 'Sair', url: '', icon: 'chevron-back-circle', action: 'sair'},
  ];

  private inscricao = new Subscription();

  mostrarMenu = false;
  public temaApp: string = "";
  usuario!: Usuario;

  constructor(
    private authService: AuthService,
    private usuarioState: UsuarioStateService,
    private temaService: TemaService,
    private router: Router, private route: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Verificar se está na rota de login
        if (event.urlAfterRedirects.includes(this.route.snapshot.routeConfig?.path || '')) {
        }
      });

    this.inscricao.add(
      this.usuarioState.usuario.subscribe((usuario: Usuario) => {
        this.usuario = usuario;
      })
    );

    this.inscricao.add(
      this.temaService.temaAtual$.subscribe(tema => {
        this.temaApp = tema;
      })
    );
  }

  ngOnInit(): void {
    this.inscricao.add(
      this.authService.mostrarMenuEmitter.subscribe(
        mostrar => this.mostrarMenu = mostrar
      )
    );
  }

  ngOnDestroy(): void {
    this.authService.mostrarMenuEmitter.unsubscribe();
    this.inscricao.unsubscribe();
  }

  navegar(page: any) {
    if (page.action == 'sair') {
      this.authService.logout();
    }
  }

  protected readonly navigate = navigate;
}
