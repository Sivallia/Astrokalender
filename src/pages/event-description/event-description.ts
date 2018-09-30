import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EventDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-description',
  templateUrl: 'event-description.html',
})
export class EventDescriptionPage {
  public ueberfluege = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
    this.ueberfluege = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDescriptionPage');
    console.log('')
  }

  closeModal(){
    this.view.dismiss();
  }  

}


