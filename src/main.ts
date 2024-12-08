import {bootstrapApplication} from '@angular/platform-browser';
import {appRouting} from "./app/app.route";
import {provideIonicAngular} from "@ionic/angular/standalone";
import {AppComponent} from "./app/app.component";
import {addIcons} from 'ionicons';
import * as allIcons from 'ionicons/icons';
import {provideHttpClient} from "@angular/common/http";
import {environmentFirebase} from "./environments/environmentFirebase";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

const icons = Object.keys(allIcons).reduce((acc: { [key: string]: any }, name) => {
  acc[name] = (allIcons as any)[name];
  return acc;
}, {});

addIcons(icons);

bootstrapApplication(AppComponent, {
  providers: [
    appRouting,
    provideIonicAngular(),
    provideHttpClient(), provideFirebaseApp(() => initializeApp(environmentFirebase)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
}).catch(err => console.error(err));
