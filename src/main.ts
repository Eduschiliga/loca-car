import { bootstrapApplication } from '@angular/platform-browser';
import { appRouting } from "./app/app.route";
import { provideIonicAngular } from "@ionic/angular/standalone";
import { AppComponent } from "./app/app.component";
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
import { provideHttpClient } from "@angular/common/http";

const icons = Object.keys(allIcons).reduce((acc: { [key: string]: any }, name) => {
  acc[name] = (allIcons as any)[name];
  return acc;
}, {});

addIcons(icons);

bootstrapApplication(AppComponent, {
  providers: [appRouting, provideIonicAngular(), provideHttpClient()]
}).catch(err => console.error(err));
