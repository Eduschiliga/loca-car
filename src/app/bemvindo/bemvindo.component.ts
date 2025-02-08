import {Component, OnInit} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {BIOMETRIC_TYPE, FingerprintAIO} from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import {Router} from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-bemvindo',
  templateUrl: './bemvindo.component.html',
  styleUrls: ['./bemvindo.component.scss'],
  imports: [IonicModule, FormsModule],
  standalone: true,
  providers: [
    FingerprintAIO,
  ],
})
export class BemvindoComponent implements OnInit {

  protected hasBiometry: boolean = false;
  protected useBiometry: boolean = false;

  constructor(
    private router: Router,
    private fingerAuth: FingerprintAIO,
  ) {
    if (localStorage.getItem("bemvindo") == "true")
      this.goToAlunoPage();
  }

  async ngOnInit() {
    await this.getBiometryStatus();
  }

  private async getBiometryStatus() {
    let aux = localStorage.getItem("useBiometry");
    if (aux == "true")
      this.useBiometry = true;

    try {
      const biometricType: BIOMETRIC_TYPE = await this.fingerAuth.isAvailable();
      this.hasBiometry = biometricType === "finger" || biometricType === "face" || biometricType === "biometric";
    } catch (error: any) {
      this.hasBiometry = false;
    }
  }

  changeBiometryValue(event: any) {
    const eventValue = event.detail.checked;
    this.useBiometry = eventValue;
    localStorage.setItem('useBiometry', eventValue);

    if (eventValue)
      localStorage.setItem('autoAuth', 'true');
  }

  skipConfig() {
    this.useBiometry = false;
    localStorage.setItem('useBiometry', "false");

    this.goToAlunoPage();
  }

  goToAlunoPage() {
    localStorage.setItem("bemvindo", "true");
    this.router.navigate(['/home']).then();
  }
}
