import { bootstrapApplication } from '@angular/platform-browser';
import {appRouting} from "./app/app.route";
import {provideIonicAngular} from "@ionic/angular/standalone";
import {AppComponent} from "./app/app.component";
import { addIcons } from 'ionicons';
import {
  archiveSharp,
  bookmarkOutline,
  bookmarkSharp,
  heartSharp, mailSharp,
  paperPlaneSharp,
  trashSharp,
  warningSharp,
  personOutline,
  personSharp
} from "ionicons/icons";

addIcons({
  'bookmark-sharp': bookmarkSharp,
  'bookmark-outline': bookmarkOutline,
  'warning-sharp': warningSharp,
  'mail-sharp': mailSharp,
  'paper-plane-sharp': paperPlaneSharp,
  'heart-sharp': heartSharp,
  'archive-sharp': archiveSharp,
  'trash-sharp': trashSharp,
  'person-outline': personOutline,
  'person-sharp': personSharp,

});


bootstrapApplication(AppComponent, {
  providers: [appRouting, provideIonicAngular()]
}).catch(err => console.error(err));
