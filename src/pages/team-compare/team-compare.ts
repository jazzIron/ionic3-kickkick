import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { environment } from './../../environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-team-compare',
  templateUrl: 'team-compare.html',
})
export class TeamComparePage {

  data: Observable<any>;
  teamId: any;

  nextMatchInfo_url: any;

  nextMatchList: any;
  nextMatchTeamInfo: any;

  recentHistory_url: any;
  getHomeRecentHistory: any;
  getAwayRecentHistory: any;

  matchTeamInfo1: any;
  matchTeamInfo2: any;


  matchCompare_url: any;
  matchCompareInfoList: any;





  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {

    this.nextMatchInfo_url = environment.getNextMatchInfo;
    this.recentHistory_url = environment.getRecentHistory;
    this.matchCompare_url = environment.getMatchCompareList;

    this.teamId = navParams.data;

      //다음경기
      this.nextMatchInfoFnc(this.teamId);
  }

  //팀 랭킹정보
  nextMatchInfoFnc(teamId) {
    let postData = new FormData();
    postData.append('teamId', teamId);
    postData.append("areaType", "E");
    this.data = this.http.post(this.nextMatchInfo_url, postData);
    this.data.subscribe(data => {

      console.log(data);

      this.nextMatchList = [{
          bothGoalH : data.nextMatchInfo[0].bothGoalH,
          bothGoalL : data.nextMatchInfo[1].bothGoalH,
          concededGameH : data.nextMatchInfo[0].concededGameH,
          concededGameHPer : data.nextMatchInfo[0].concededGameHPer,
          concededGameL : data.nextMatchInfo[1].concededGameH,
          concededGameLPer : data.nextMatchInfo[1].concededGameHPer,
          defeatsH : data.nextMatchInfo[0].defeatsH,
          defeatsL : data.nextMatchInfo[1].defeatsH,
          drawH : data.nextMatchInfo[0].drawH,
          drawL : data.nextMatchInfo[1].drawH,
          over25H : data.nextMatchInfo[0].over25H,
          over25L : data.nextMatchInfo[1].over25H,
          over35H : data.nextMatchInfo[0].over35H,
          over35L : data.nextMatchInfo[1].over35H,
          pointGameH : data.nextMatchInfo[0].pointGameH,
          pointGameHPer : data.nextMatchInfo[0].pointGameHPer,
          pointGameL : data.nextMatchInfo[1].pointGameH,
          pointGameLPer : data.nextMatchInfo[1].pointGameHPeH,
          scoredGameH : data.nextMatchInfo[0].scoredGameH,
          scoredGameHPer : data.nextMatchInfo[0].scoredGameHPer,
          scoredGameL : data.nextMatchInfo[1].scoredGameH,
          scoredGameLPer : data.nextMatchInfo[1].scoredGameHPer,
          totalGoalH : data.nextMatchInfo[0].totalGoalH,
          totalGoalHPer : data.nextMatchInfo[0].totalGoalHPer,
          totalGoalL : data.nextMatchInfo[1].totalGoalH,
          totalGoalLPer : data.nextMatchInfo[1].totalGoalHPer,
          winsH : data.nextMatchInfo[0].winsH,
          winsL : data.nextMatchInfo[1].winsH,
      }];

      this.nextMatchTeamInfo =[{
        teamshortNmH: data.nextMatchInfo[0].teamshortNm,
        teamshortNmA: data.nextMatchInfo[1].teamshortNm,
        teamImgH : data.nextMatchInfo[0].img2,
        teamImgA : data.nextMatchInfo[1].img2,
        teamRankInfoH : data.nextMatchInfo[0].rankInfo,
        teamRankInfoA : data.nextMatchInfo[1].rankInfo,
        homeGround : data.nextMatchInfo[0].homeGround,
        matchDate : data.nextMatchInfo[0].matchDate,
        matchRound : data.nextMatchInfo[0].matchRound,
        homeRank : data.nextMatchInfo[0].rankInfo,
        awayRank : data.nextMatchInfo[1].rankInfo,
        homeColor : data.nextMatchInfo[0].teamColor,
        awayColor : data.nextMatchInfo[1].teamColor,
      }];

      this.matchTeamInfo1 = data.nextMatchInfo[0].teamId;
      this.matchTeamInfo2 = data.nextMatchInfo[1].teamId;

      this.recentHistoryFnc(this.matchTeamInfo1, "home");
      this.recentHistoryFnc(this.matchTeamInfo2, "away");
      this.matchCompareList(this.matchTeamInfo1, this.matchTeamInfo2);

    }, (err) => {
      console.log("data Error");
    });
  }


    //팀 랭킹정보
    matchCompareList(homeTeamId:any, awayTeamId:any) {
      let postData = new FormData();
      postData.append('homeTeamId', homeTeamId);
      postData.append('awayTeamId', awayTeamId);
      postData.append("areaType", "E");
      this.data = this.http.post(this.matchCompare_url, postData);
      this.data.subscribe(data => {
        console.log(data);
        this.matchCompareInfoList = data.setMatchCompareList;
      }, (err) => {
        console.log("data Error");
      });
    }

  //팀 최근경기정보
  recentHistoryFnc(teamId:any, type:any) {
    let postData = new FormData();
    postData.append('teamId', teamId);
    postData.append("sortType", "dateDesc");
    postData.append("areaType", "E");
    postData.append("limitCnt", "5");
    postData.append("state", "after");
    this.data = this.http.post(this.recentHistory_url, postData);
    this.data.subscribe(data => {
      if(type == "home"){
        this.getHomeRecentHistory = data.setMatchRecentHistory;
      }else if(type == "away"){
        this.getAwayRecentHistory = data.setMatchRecentHistory;
      }
    }, (err) => {
      console.log("data Error");
    });
  }



}
