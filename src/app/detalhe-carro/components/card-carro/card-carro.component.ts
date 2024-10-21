import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Carro} from "../../../models/carro";
import  {Swiper} from "swiper";
import {register} from "swiper/element/bundle";

register();
@Component({
  selector: 'app-card-carro',
  templateUrl: './card-carro.component.html',
  styleUrls: ['./card-carro.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardCarroComponent  {
  @Input() carro!: Carro;
  protected isModalOpen = false;
  protected URL_IMG = 'assets/';

  public swiper!: Swiper;

  constructor() { }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
