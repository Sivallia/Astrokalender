import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarModule } from "ion2-calendar";
import { CalendarComponentOptions } from 'ion2-calendar'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  type: 'string';
  format: 'string';
  dateMulti: string[];
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  }

  constructor(public navCtrl: NavController) {

  }
  onChange($event) {
    console.log($event);
  }
}
