import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { TeamPage } from './../teamPage/teamPage';
import { TeamInfoPage } from '../team-info/team-info';

@Component({
  selector: 'page-matchPage',
  templateUrl: 'matchPage.html'
})

@Injectable()
export class MatchPage {

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;

  SwipedTabsIndicator: any = null;

  api_url: any;
  matchCnt_url: any;
  data: Observable<any>;

  teamMatchList: any = [];
  tabs: any = [];
  matchCntNum: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.api_url =  environment.getWeekMatchList;
    this.matchCnt_url = environment.getMatchRound;
    this.matchList();
    this.matchCnt();
  }

  //팀 랭킹리스트
  matchList() {
    let postData = new FormData();
    postData.append('matchRound', "23");
    postData.append('areaType', "E");
    this.data = this.http.post(this.api_url, postData);

    this.data.subscribe(data => {
      this.teamMatchList = data.weekMatchList;
    }, (err) => {
      console.log("data Error");
    });
  }

  detailTeam(teamId: any) {
    this.navCtrl.push(TeamInfoPage, teamId);
  }

  matchCnt() {
    let postData = new FormData();
    this.data = this.http.post(this.matchCnt_url, postData);

    this.data.subscribe(data => {
      //console.log(data.matchRound[0]);
      this.matchCntNum = data.matchRound[0].maxRound;
      for (var i = 1; i <= this.matchCntNum; i++) {
        this.tabs.push(i + "R");
      }
    }, (err) => {
      console.log("data Error");
    });
  }

  matchSelect(round: any) {
    let postData = new FormData();
    postData.append('matchRound', round);
    postData.append('areaType', "E");
    this.data = this.http.post(this.api_url, postData);

    this.data.subscribe(data => {
      console.log(data);
      this.teamMatchList = data.weekMatchList;
    }, (err) => {
      console.log("data Error");
    });
  }

    //데이터 체크
    isValidString(strVal: any) {
      if (strVal != undefined && strVal.length > 0) {
        return true;
      }
      return false;
    }



}
