import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import moment from 'moment';
import { convertUrlToDehydratedSegments } from 'ionic-angular/umd/navigation/url-serializer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  type: 'string';
  events=new Map< number,any>();
  dateMulti: String[] = [];
  optionsMulti: CalendarComponentOptions = {
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
    this.computeUeberfluege(this.rawData);
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

  computeUeberfluege(apiData) {
    for (let overpass of apiData['passes']) {
      this.countUeberfluege(overpass);
      this.putOverpassDetails(apiData['info'], overpass);
    }

    this.optionsMulti.daysConfig = [];
    for (let date in this.ueberfluegeAnzahl) {
      this.optionsMulti.daysConfig.push({
          date: moment(date, 'YYYY-MM-DD').toDate(),
          marked: true,
          subTitle: this.ueberfluegeAnzahl[date].toString(),
      })
    }
    console.log(this.ueberfluegeProTag);
  }

  countUeberfluege(overpass) {
    console.log(moment(overpass['startUTC']));
      let date = moment.utc(overpass['startUTC'] * 1000);
      let timestamp = date.format('YYYY-MM-DD');
      console.log(timestamp);
      if (timestamp in this.ueberfluegeAnzahl) {
        this.ueberfluegeAnzahl[timestamp] += 1;
      }
      else {
        this.ueberfluegeAnzahl[timestamp] = 1;
      }
  }

  putOverpassDetails(info, overpass) {
    let utc = moment.utc(overpass['startUTC'] * 1000);
    let timestamp = utc.format('YYYY-MM-DD');
    let details = {
      satname: info['satname'],
      date: utc.format('LL'),
      time: utc.format('LTS'),
      direction: overpass['startAzCompass'],
      duration: overpass['duration']
    };

    if (timestamp in this.ueberfluegeProTag) {
      this.ueberfluegeProTag[timestamp].push(details);
    }
    else {
      this.ueberfluegeProTag[timestamp] = [details];
    }
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
