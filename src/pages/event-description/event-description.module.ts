import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDescriptionPage } from './event-description';

@NgModule({
  declarations: [
    EventDescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDescriptionPage),
  ],
})
export class EventDescriptionPageModule {}
