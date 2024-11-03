import {Component, EventEmitter, Input, NgModule, OnDestroy, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router, RouterModule} from '@angular/router';
import {InteresseStateService} from "../../services/interesse/state/interesse-state.service";
import {InteresseApiService} from "../../services/interesse/api/interesse-api.service";
import {buildInteresse, Interesse} from "../../services/interesse/model/interesse";
import {JsonPipe, NgIf} from "@angular/common";
import {Subscription} from "rxjs";

interface BarraPesquisa {
  mostrar: boolean;
  placeholder: string;
}

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss'],
  imports: [
    IonicModule,
    NgIf,
    JsonPipe
  ],
  standalone: true
})
export class CabecalhoComponent implements OnInit, OnDestroy {
  @Input() nomePagina: string = '';
  @Input() barraPesquisa: BarraPesquisa = {mostrar: false, placeholder: 'Realize a sua pesquisa'};
  @Input() mostrarInteresse: boolean = false;

  @Output() inputPesquisa = new EventEmitter();

  private inscricao = new Subscription();
  protected interesses: Interesse = buildInteresse();

  constructor(
    private router: Router,
    private interesseState: InteresseStateService,
    private interesseApi: InteresseApiService,
  ) {
      this.buscarInteresses();
  }

  buscarInteresses() {
    this.inscricao.add(
      this.interesseApi.buscarTodos().subscribe(
        {
          next: (interesse: Interesse) => {
            this.interesseState.setCarrosLista(interesse);
            console.log(this.interesses);
          }
        }
      )
    );

  }

  ngOnInit(): void {
    this.inscricao.add(
      this.interesseState.interesse$.subscribe({
        next: (interesses: Interesse) => {
          console.log('Received interesses:', interesses);
          this.interesses = interesses;
        },
        error: (err) => console.error('Error fetching interesses:', err)
      })
    );
  }

  protected handleInput(evt: any) {
    this.inputPesquisa.emit(evt.target.value);
  }

  redirecionarInteresse() {
    this.router.navigate(['/interesse']);
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
