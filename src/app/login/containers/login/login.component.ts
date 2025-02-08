import {Component, OnInit} from '@angular/core';
import {IonicModule, ToastController} from '@ionic/angular';
import {Usuario} from '../../../models/usuario';
import {AuthService} from '../../../services/auth/auth.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingService} from "../../../shared/loading/loading.service";
import {Subscription} from "rxjs";
import {FirebaseService} from "../../../services/firebase/firebase.service";
import {FingerprintAIO} from "@awesome-cordova-plugins/fingerprint-aio/ngx";
import {FingerprintOptions} from "@awesome-cordova-plugins/fingerprint-aio";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgIf
  ],
  providers: [
    FingerprintAIO,
  ],

  standalone: true
})
export class LoginComponent implements OnInit {
  usuario: Partial<Usuario> = {
    email: '',
    senha: '',
    permanecerConectado: false
  };

  public hasBiometry: boolean = false;
  public useBiometry: boolean = false;

  private inscricao = new Subscription();

  constructor(
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
    private firebaseService: FirebaseService,
    private fingerAuth: FingerprintAIO,
  ) {
  }

  ngOnInit() {
    this.verificarUsuarioAutenticadoComToken().then();
  }

  public async verificarUsuarioAutenticadoComToken() {
    if (this.firebaseService.idFirebase) {
      const loading = await this.loadingService.showLoading('Autenticando Usuário...');

      this.inscricao.add(
        (await this.authService.verificarToken()).subscribe({
          next: (autenticado) => {
            if (autenticado) {
              if (this.hasBiometry && this.useBiometry) {
                this.showFingerprintAuthDlg();
              } else {
                this.router.navigate(['/home']);
              }
            }
          },
          error: () => {
            this.router.navigate(['/login']);
            loading.dismiss();
          },
          complete: () => {
            loading.dismiss();
          }
        })
      );
    }
  }

  async showFingerprintAuthDlg() {
    let fingerprintOptions: FingerprintOptions;

    fingerprintOptions = {
      title: 'Autenticação por biometria detectada',
      subtitle: 'UTFPR Mobile Alunos',
      description: 'Coloque seu dedo no sensor de impressão digital',
      disableBackup: true
    }

    this.fingerAuth.show(fingerprintOptions).then(() => {
      this.router.navigate(['/home']);
    }).catch((error) => {
      this.showMessage("bottom", error.message, "Autenticação por biometria cancelada");
      localStorage.clear();
    });
  }

  async showMessage(position: 'top' | 'middle' | 'bottom', msg?: string | null, headMsg?: string | null | any, temp?: number | null) {
    const toast = await this.toastCtrl.create({
      header: headMsg ?? "",
      message: msg ?? "",
      duration: temp ?? 3500,
      position: position,
      buttons: ['X'],
    });
    await toast.present();
  }

  protected login(): void {
    this.authService.fazerLogin(this.usuario);
  }

  protected registrarUsuario(): void {
    this.router.navigate(['login/cadastrar']);
  }
}
