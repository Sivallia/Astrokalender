import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  public id :number=25544;
  public observer_lat :number=51.7189;
  public observer_lng :number=8.7575;
  public observer_alt :number=121;
  public days :number=10;
  public min_visibility :number=0;
  public und_api_key : string='&apiKey=PUBY9H-2U2J2H-RSU83G-3W4U';

  public Iridium_IDs : number[];

  apiUrl = 'http://www.n2yo.com/rest/v1/satellite/visualpasses/'+this.id+'/'+this.observer_lat+'/'+this.observer_lng+'/'+this.observer_alt+'/'+this.days+'/'+this.min_visibility+this.und_api_key;
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
    this.Iridium_IDs=[43578,43577,43576,43575,43574,43573,43572,43571,43570,43569,43482,43481,43480,43479,43478,43258,43257,43256,43255,43254,43253,43252,43251,43250,43249,43279,43278,43277,43276,
      43275,43274,43273,43272,43271,43270,42964,42963,42962,42961,42960,42959,42958,42957,42956,42955,42812,42811,42810,42809,42808,42807,42806,42805,42804,42803,41926,41925,41924,41923,41922,41921,41920,
      41919,41918,41917,27450,27376,27375,27373,27372,25777,25578,25577,25531,25530,25528,25527,25467,25344,25342,25320,25319,25287,25286,25285,25276,25275,25274,25273,25272,25263,25262,25173,25171,25170,25169,25105,
      25104,25078,25077,25043,25042,24967,24966,24950,24948,24946,24945,24944,24926,24925,24907,24905,24903,24873,24871,24870,24869,24842,24841,24839,24836,24796,24795,24793];
  }

  getvisualpasses(NoradID:number) {
    console.log(this.apiUrl)
    this.id=NoradID;
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {

        console.log(data['info']['satid'])
        console.log(data['info']['satname'])
        console.log(data['passes'][0]['startUTC'])
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  

 
}
