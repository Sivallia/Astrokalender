import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public type: 'string';
  public events=new Map< number,any>();
  dateMulti: String[] = [];
  public optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
    daysConfig: [
      {
        date: new Date(2018,0,10),
        marked: true,
        subTitle: "how are you",
      }
    ]
  }

  ueberfluegeProTag = {}
  ueberfluegeAnzahl = {}

  constructor(public navCtrl: NavController, public modCtrl: ModalController) {
    console.log(this.rawData['info']['satname']);
    for (let overpass of this.rawData['passes']) {
      console.log(overpass['startUTC']);
    }
  }
  onChange($event) {
    console.log($event);
    this.dateMulti=[];
  }

  onSelect($event) {
    console.log($event); 
  
    let testDescription={NoradID:25544,Name:'SPACE STATION',StartUTC:153817222,EndUTC:153817223,Duration:1}

    this.events.set(1538172000,testDescription);

    //const myModal = this.modCtrl.create('EventDescriptionPage', this.rawData);
    const myModal = this.modCtrl.create('EventDescriptionPage', testDescription);
    myModal.present();
  }


  rawData = {
    "info": {
      "satid": 25544,
      "satname": "SPACE STATION",
      "transactionscount": 4,
      "passescount": 3
    },
    "passes": [
      {
        "startAz": 307.21,
        "startAzCompass": "NW",
        "startEl": 13.08,
        "startUTC": 1521368025,
        "maxAz": 225.45,
        "maxAzCompass": "SW",
        "maxEl": 78.27,
        "maxUTC": 1521368345,
        "endAz": 132.82,
        "endAzCompass": "SE",
        "endEl": 0,
        "endUTC": 1521368660,
        "mag": -2.4,
        "duration": 485
      },
      {
        "startAz": 311.56,
        "startAzCompass": "NW",
        "startEl": 50.94,
        "startUTC": 1521451295,
        "maxAz": 37.91,
        "maxAzCompass": "NE",
        "maxEl": 52.21,
        "maxUTC": 1521451615,
        "endAz": 118.61,
        "endAzCompass": "ESE",
        "endEl": 0,
        "endUTC": 1521451925,
        "mag": -2,
        "duration": 325
      },
      {
        "startAz": 291.06,
        "startAzCompass": "WNW",
        "startEl": 3.47,
        "startUTC": 1521457105,
        "maxAz": 231.58,
        "maxAzCompass": "SW",
        "maxEl": 14.75,
        "maxUTC": 1521457380,
        "endAz": 170.63,
        "endAzCompass": "S",
        "endEl": 0,
        "endUTC": 1521457650,
        "mag": -0.1,
        "duration": 485
      }
    ]
  };
}
