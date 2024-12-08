import {Routes} from "@angular/router";
import {PublicarComponent} from "./publicar.component";

export const PUBLICAR_ROUTE: Routes = [
  {
    path: '',
    component: PublicarComponent,
  },
  {
    path: 'editar/:id',
    component: PublicarComponent,
  }
];
