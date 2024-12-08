import {Component, OnDestroy} from '@angular/core';
import {CabecalhoComponent} from "../shared/cabecalho/cabecalho.component";
import {IonicModule} from "@ionic/angular";
import {buildCarro, Carro} from "../models/carro";
import {AuthService} from "../services/auth/auth.service";
import {Usuario} from "../models/usuario";
import {Subscription} from "rxjs";
import {CarroApiService} from "../services/carro/api/carro-api.service";
import {UtilsService} from "../utils/utils.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.scss'],
  imports: [
    CabecalhoComponent,
    IonicModule,
    FormsModule
  ],
  standalone: true
})
export class PublicarComponent implements OnDestroy {
  protected formCarro: Carro = buildCarro();
  protected inscricao: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private carroService: CarroApiService,
    private utils: UtilsService,
    private router: Router
  ) {
    this.setarUsuario();
  }

  protected setarUsuario() {
    this.formCarro.usuario = <Usuario>this.authService.usuario;
  }

  protected publicar() {

    console.log(this.formCarro)
    this.inscricao.add(
      this.carroService.criar(this.formCarro).subscribe(
        {
          next: () => {
            this.utils.presentToast('bottom', 'Carro publicado com sucesso!').then();
            this.router.navigate(['/home']).then();
          },
          error: (err) => {
            this.utils.presentToast('bottom', 'Erro ao publicar o carro! ' + err.getMessage()).then();
          }
        }
      )
    );
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        console.log('Imagem selecionada:', file);
        // Faça o upload ou processe as imagens aqui
      });
    }
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
