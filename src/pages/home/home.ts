import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import moment from 'moment';
import { RestProvider } from '../../providers/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loaded: boolean = false;
  type: 'string';
  events = new Map<number, any>();
  dateMulti: String[] = [];
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
    daysConfig: [
      {
        date: new Date(2018,0,10),
        marked: true
      }
    ]
  }

  ueberfluegeProTag = {}
  ueberfluegeAnzahl = {}


  constructor(public navCtrl: NavController, public modCtrl: ModalController, public restC:RestProvider) {
  }
  
  ionViewWillLoad() {
    var self = this;
    Promise.all(self.restC.Iridium_IDs.map(ID => {
      return self.restC.getvisualpasses(ID).then(data => {
        return self.computeUeberfluege(self, data);
      });
    })).then(result => {
      self.displayOverpassesOnCalendar(self);
      console.log("hallo");
      console.log(self.optionsMulti.daysConfig);
      self.loaded = true;
    });
  }

  ionViewDidLoad() {
    //this.displayOverpassesOnCalendar();
  }

  onChange($event) {
    console.log($event);
    this.dateMulti=[];
  }

  onSelect($event) {
    console.log($event);
    
    let timestamp = moment.utc($event.time).format('YYYY-MM-DD');
    let ueberfluege = this.ueberfluegeProTag[timestamp];
    console.log(ueberfluege);

    //const myModal = this.modCtrl.create('EventDescriptionPage', this.rawData);
    const myModal = this.modCtrl.create('EventDescriptionPage', {data:ueberfluege});
    myModal.present();
  }

  computeUeberfluege(self, apiData) {
    for (let overpass of apiData['passes']) {
      self.countUeberfluege(self, overpass);
      self.putOverpassDetails(self, apiData['info'], overpass);
    }
  }

  displayOverpassesOnCalendar(self) {
    self.optionsMulti.daysConfig = Object.keys(self.ueberfluegeAnzahl).map(date => ({
      date: moment(date, 'YYYY-MM-DD').toDate(),
      marked: true,
      subTitle: self.ueberfluegeAnzahl[date].toString(),
    }));
  }

  countUeberfluege(self, overpass) {
    let date = moment.utc(overpass['startUTC'] * 1000);
    let timestamp = date.format('YYYY-MM-DD');
    if (timestamp in self.ueberfluegeAnzahl) {
      self.ueberfluegeAnzahl[timestamp] += 1;
    }
    else {
      self.ueberfluegeAnzahl[timestamp] = 1;
    }
  }

  putOverpassDetails(self, info, overpass) {
    let utc = moment.utc(overpass['startUTC'] * 1000);
    let timestamp = utc.format('YYYY-MM-DD');
    let details = {
      satname: info['satname'],
      date: utc.format('LL'),
      time: utc.format('LTS'),
      direction: overpass['startAzCompass'],
      duration: overpass['duration']
    };

    if (timestamp in self.ueberfluegeProTag) {
      self.ueberfluegeProTag[timestamp].push(details);
    }
    else {
      self.ueberfluegeProTag[timestamp] = [details];
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
