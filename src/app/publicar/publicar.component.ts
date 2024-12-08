import {Component, OnDestroy} from '@angular/core';
import {CabecalhoComponent} from "../shared/cabecalho/cabecalho.component";
import {IonicModule} from "@ionic/angular";
import {buildCarro, Carro} from "../models/carro";
import {AuthService} from "../services/auth/auth.service";
import {Usuario} from "../models/usuario";
import {Subscription} from "rxjs";
import {CarroApiService} from "../services/carro/api/carro-api.service";
import {UtilsService} from "../utils/utils.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  protected selectFile: File | null = null;
  protected formData: FormData = new FormData();
  protected rotaAtual = this.activateRoute?.snapshot?.url[0]?.path;
  protected id = this.activateRoute?.snapshot?.url[1]?.path;

  constructor(
    private authService: AuthService,
    private carroService: CarroApiService,
    private utils: UtilsService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {
    this.setarUsuario();

    console.log(this.activateRoute.snapshot.url)

    console.log(this.rotaAtual)
    console.log(this.id)

    if (this.rotaAtual == 'editar') {
      this.buscarCarro();
      console.log(this.formData)
    }
  }

  protected buscarCarro() {
    if (this.id) {
      this.inscricao.add(
        this.carroService.buscarPorId(parseInt(this.id)).subscribe(
          {
            next: (carro: Carro) => {
              this.formCarro = carro;
            },
            error: (err) => {
              this.utils.presentToast('bottom', 'Erro ao buscar o carro! ' + err.getMessage()).then();
            }
          }
        )
      );
    }
  }

  protected setarUsuario() {
    this.formCarro.usuario = <Usuario>this.authService.usuario;
  }

  protected publicar() {
    if (this.rotaAtual == 'editar') {
      this.inscricao.add(
        this.carroService.editar(this.formCarro).subscribe(
          {
            next: (carro: any) => {
              this.utils.presentToast('bottom', 'Carro editado com sucesso!').then();
            },
            error: (err) => {
              this.utils.presentToast('bottom', 'Erro ao editar o carro! ' + err.getMessage()).then();
            }
          }
        )
      );
    } else {
      this.inscricao.add(
        this.carroService.criar(this.formCarro).subscribe(
          {
            next: (carro: any) => {
              this.utils.presentToast('bottom', 'Carro publicado com sucesso!').then();

            },
            error: (err) => {
              this.utils.presentToast('bottom', 'Erro ao publicar o carro! ' + err.getMessage()).then();
            }
          }
        )
      );

      this.inscricao.add(
        this.carroService.enviarImagem(this.formData).subscribe(
          {
            next: (imagem: any) => {

              console.log(imagem)
              // this.router.navigate(['/home']).then();
            },
            error: (err) => {
              this.utils.presentToast('bottom', 'Erro ao enviar a imagem do carro! ' + err.getMessage()).then();
            }
          }
        )
      );
    }
  }

  removerImagem() {
    this.formData = new FormData();
    this.selectFile = null;
  }

  onFileSelected(event: any) {
    this.selectFile = event.target.files[0];

    if (this.selectFile) {
      this.formData.append('file', this.selectFile);
    }
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
