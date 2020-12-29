import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-noticePage',
  templateUrl: 'noticePage.html',
})
export class NoticePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticePage');
  }

}
