import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

import { IonPullUpFooterState } from "ionic-pullup";
import { TeamListPage } from '../teamListPage/teamListPage';


@Component({
  selector: 'page-teamPage',
  templateUrl: 'teamPage.html'
})

export class TeamPage {


  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;

  data: Observable<any>;
  tabs: any = [];

  footerState: IonPullUpFooterState; //하단 영역

  SwipedTabsIndicator: any = null;
  slidesMoving: any;
  slidesHeight: any;

  teamInfo_url: any;
  teamInfo: any;
  teamImg: any;
  teamName: any;
  teamEngName: any;
  teamColor: any;


  teamRank_url: any;
  getTeamRank: any;

  advantage_url: any;
  getHomeAdvantage: any;

  recentHistory_url: any;
  getRecentHistory: any;

  goalMargins_url: any;
  goalMarginsList: any;

  scoringStats_url: any;
  scoringStatsHome: string[];
  scoringStatsAway: string[];
  scoringStatsTotal: string[];

  goalMargin1: string[];
  goalMargin2: string[];
  goalMargin3: string[];
  goalMargin4: string[];

  matchHalfResult_url: any;
  homeHalf: string[];
  awayHalf: string[];
  totalHalf: string[];

  relative_url: any;
  relative_item1: any[];
  relative_item2: any[];
  relative_item3: any[];
  relative_item4: any[];
  relative_item5: any[];
  relative_item6: any[];

  teamAverage_url: any;
  groundType: any;
  groundLeagueList: any[];
  groundHomeList: any[];
  groundAwayList: any[];

  matchHistory_url: any;
  allMatchList: any[];
  afterMatchList: any[];
  beforeMatchList: any[];
  matchType:any;

  nextMatchInfo_url: any;
  nextMatchList: any;
  nextMatchTeamInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    //tab
    this.tabs = ["요약", "골통계", "구단통계", "vs리그", "경기"];
    this.teamInfo_url = environment.getTeamInfo;
    this.teamRank_url = environment.teamRankList;
    this.advantage_url = environment.getHomeAdvantage;
    this.recentHistory_url = environment.getRecentHistory;
    this.goalMargins_url = environment.getGoalMargins;
    this.scoringStats_url = environment.getScoringStats;
    this.matchHalfResult_url = environment.getMatchHalfResult;
    this.relative_url = environment.getRelative;
    this.teamAverage_url = environment.getTeamAverage;
    this.matchHistory_url =  environment.getMatchHistory;
    this.nextMatchInfo_url = environment.getNextMatchInfo;

    this.footerState = IonPullUpFooterState.Collapsed;

    this.matchType = "allMatch";
    this.groundType = "groundLeague";

    //팀 랭킹리스트
    this.teamInfoFnc();

    //팀 랭킹정보
    this.teamRankFnc();
    //팀 요약정보
    this.teamAdvantageFnc();
    //최근경기 정보
    this.recentHistoryFnc();
    //경기별 득실차 정보
    this.getGoalMarginsFnc();
    //득실차 정보
    this.getScoringStatsFnc();
    //전반전 통계
    this.matchHalfResultFnc();
    //vs리그
    this.teamAverageFnc();

    this.RelativeFnc();

    this.matchHistoryFnc('allMatch');
    this.matchHistoryFnc('afterMatch');
    this.matchHistoryFnc('beforeMatch');

    //다음경기
    this.nextMatchInfoFnc();


  }

  backBtn(){
    this.navCtrl.push(TeamListPage);
  }

  detailTeam(teamId: any) {
    this.navCtrl.push(TeamPage, teamId);
  }

  //데이터 체크
  isValidString(strVal: any) {
    if (strVal != undefined && strVal.length > 0) {
      return true;
    }
    return false;
  }

  //팀 정보
  teamInfoFnc() {
    let postData = new FormData();
    postData.append('teamId', "1");
    this.data = this.http.post(this.teamInfo_url, postData);
    this.data.subscribe(data => {
      this.teamInfo = data.teamInfoList;
      //teamColor

      this.teamImg = data.teamInfoList[0].img;
      this.teamName= data.teamInfoList[0].teamshortNm;
      this.teamEngName= data.teamInfoList[0].teamNameEng;

    }, (err) => {
      console.log("data Error");
    });
  }

  //팀 랭킹정보
  teamRankFnc() {
    let postData = new FormData();
    postData.append('teamId', "1");
    this.data = this.http.post(this.teamRank_url, postData);
    this.data.subscribe(data => {
      this.getTeamRank = data.teamRankList;
    }, (err) => {
      console.log("data Error");
    });
  }

  //팀 요약정보
  teamAdvantageFnc() {
    let postData = new FormData();
    postData.append('teamId', "1");
    this.data = this.http.post(this.advantage_url, postData);
    this.data.subscribe(data => {
      this.getHomeAdvantage = data.homeAdvantageList;
    }, (err) => {
      console.log("data Error");
    });
  }

  //팀 최근경기정보
  recentHistoryFnc() {
    let postData = new FormData();
    postData.append('teamId', "1");
    postData.append("sortType", "dateDesc");
    postData.append("areaType", "E");
    postData.append("limitCnt", "5");
    postData.append("state", "after");
    this.data = this.http.post(this.recentHistory_url, postData);
    this.data.subscribe(data => {
      this.getRecentHistory = data.setMatchRecentHistory;
    }, (err) => {
      console.log("data Error");
    });
  }

  //경기별 득실차
  getGoalMarginsFnc() {
    let postData = new FormData();
    postData.append('teamId', "1");
    this.data = this.http.post(this.goalMargins_url, postData);
    this.data.subscribe(data => {
      this.goalMargin1 = [
        data.goalMarginsList.goal1[0].num,
        data.goalMarginsList.goal1[1].num,
        data.goalMarginsList.goal1[2].num,
        data.goalMarginsList.goal1[3].num
      ];
      this.goalMargin2 = [
        data.goalMarginsList.goal2[0].num,
        data.goalMarginsList.goal2[1].num,
        data.goalMarginsList.goal2[2].num,
        data.goalMarginsList.goal2[3].num
      ];
      this.goalMargin3 = [
        data.goalMarginsList.goal3[0].num,
        data.goalMarginsList.goal3[1].num,
        data.goalMarginsList.goal3[2].num,
        data.goalMarginsList.goal3[3].num
      ];
      this.goalMargin4 = [
        data.goalMarginsList.goal4[0].num,
        data.goalMarginsList.goal4[1].num,
        data.goalMarginsList.goal4[2].num,
        data.goalMarginsList.goal4[3].num
      ];
    }, (err) => {
      console.log("data Error");
    });
  }

  //경기별 득실차
  getScoringStatsFnc() {
    let postData = new FormData();
    postData.append('teamId', "1");
    this.data = this.http.post(this.scoringStats_url, postData);
    this.data.subscribe(data => {
      this.scoringStatsHome = [
        data.scoringStatsList[0].num + "%",
        data.scoringStatsList[3].num + "%",
        data.scoringStatsList[6].num + "%",
        data.scoringStatsList[9].num + "%",
        data.scoringStatsList[12].num + "%",
      ];
      this.scoringStatsAway = [
        data.scoringStatsList[1].num + "%",
        data.scoringStatsList[4].num + "%",
        data.scoringStatsList[7].num + "%",
        data.scoringStatsList[10].num + "%",
        data.scoringStatsList[13].num + "%",
      ];
      this.scoringStatsTotal = [
        data.scoringStatsList[2].num + "%",
        data.scoringStatsList[5].num + "%",
        data.scoringStatsList[8].num + "%",
        data.scoringStatsList[11].num + "%",
        data.scoringStatsList[14].num + "%",
      ];
    }, (err) => {
      console.log("data Error");
    });
  }

  //팀 최근경기정보
  matchHalfResultFnc() {
    let postData = new FormData();
    postData.append('teamId', "1");
    this.data = this.http.post(this.matchHalfResult_url, postData);
    this.data.subscribe(data => {
      let totalMatch =
        parseInt(data.matchHalfResult[0].num) + parseInt(data.matchHalfResult[1].num) +
        parseInt(data.matchHalfResult[2].num) + parseInt(data.matchHalfResult[3].num) +
        parseInt(data.matchHalfResult[4].num) + parseInt(data.matchHalfResult[5].num);
      this.homeHalf = [
        data.matchHalfResult[0].num,
        data.matchHalfResult[1].num,
        data.matchHalfResult[2].num,
      ]
      this.awayHalf = [
        data.matchHalfResult[3].num,
        data.matchHalfResult[4].num,
        data.matchHalfResult[5].num,
      ]
      this.totalHalf = [
        Math.round((parseInt(data.matchHalfResult[0].num) + parseInt(data.matchHalfResult[3].num)) / totalMatch * 100) + "%",
        Math.round((parseInt(data.matchHalfResult[1].num) + parseInt(data.matchHalfResult[4].num)) / totalMatch * 100) + "%",
        Math.round((parseInt(data.matchHalfResult[2].num) + parseInt(data.matchHalfResult[5].num)) / totalMatch * 100) + "%"
      ]
    }, (err) => {
      console.log("data Error");
    });
  }

  //구단 통계
  RelativeFnc() {
    let postData = new FormData();
    postData.append('teamId', "1");
    this.data = this.http.post(this.relative_url, postData);
    this.data.subscribe(data => {
      this.relative_item1 = [
        data.relativeFormList[0].DPA,
        data.relativeFormList[0].DGA,
        data.relativeFormList[0].DCA
      ]
      this.relative_item2 = [
        data.relativeFormList[0].DP8,
        data.relativeFormList[0].DG8,
        data.relativeFormList[0].DC8
      ]
      this.relative_item3 = [
        data.relativeFormList[0].PD + "%",
        data.relativeFormList[0].GD + "%",
        data.relativeFormList[0].CD + "%"
      ]

      this.relative_item4 = [
        parseInt(data.relativeFormList[1].homeWin),
        parseInt(data.relativeFormList[1].awayWin),
        parseInt(data.relativeFormList[1].homeWin) + parseInt(data.relativeFormList[1].awayWin)
      ]
      this.relative_item5 = [
        parseInt(data.relativeFormList[1].homeDraw),
        parseInt(data.relativeFormList[1].awayDraw),
        parseInt(data.relativeFormList[1].homeDraw) + parseInt(data.relativeFormList[1].awayDraw)
      ]
      this.relative_item6 = [
        parseInt(data.relativeFormList[1].homeLose),
        parseInt(data.relativeFormList[1].awayLose),
        parseInt(data.relativeFormList[1].homeLose) + parseInt(data.relativeFormList[1].awayLose)
      ]
    }, (err) => {
      console.log("data Error");
    });
  }

  teamAverageFnc() {
    let postData = new FormData();
    postData.append('teamId', "1");
    this.data = this.http.post(this.teamAverage_url, postData);
    this.data.subscribe(data => {
      this.groundHomeList =[{
          bothGoalH : data.teamAverageList[0].bothGoalH,
          bothGoalL : data.teamAverageList[0].bothGoalL,
          concededGameH : data.teamAverageList[0].concededGameH,
          concededGameHPer : data.teamAverageList[0].concededGameHPer,
          concededGameL : data.teamAverageList[0].concededGameL,
          concededGameLPer : data.teamAverageList[0].concededGameLPer,
          defeatsH : data.teamAverageList[0].defeatsH,
          defeatsL : data.teamAverageList[0].defeatsL,
          drawH : data.teamAverageList[0].drawH,
          drawL : data.teamAverageList[0].drawL,
          over25H : data.teamAverageList[0].over25H,
          over25L : data.teamAverageList[0].over25L,
          over35H : data.teamAverageList[0].over35H,
          over35L : data.teamAverageList[0].over35L,
          pointGameH : data.teamAverageList[0].pointGameH,
          pointGameHPer : data.teamAverageList[0].pointGameHPer,
          pointGameL : data.teamAverageList[0].pointGameL,
          pointGameLPer : data.teamAverageList[0].pointGameLPer,
          scoredGameH : data.teamAverageList[0].scoredGameH,
          scoredGameHPer : data.teamAverageList[0].scoredGameHPer,
          scoredGameL : data.teamAverageList[0].scoredGameL,
          scoredGameLPer : data.teamAverageList[0].scoredGameLPer,
          teamID : data.teamAverageList[0].teamID,
          totalGoalH : data.teamAverageList[0].totalGoalH,
          totalGoalHPer : data.teamAverageList[0].totalGoalHPer,
          totalGoalL : data.teamAverageList[0].totalGoalL,
          totalGoalLPer : data.teamAverageList[0].totalGoalLPer,
          winsH : data.teamAverageList[0].winsH,
          winsL : data.teamAverageList[0].winsL,
        }];

        this.groundAwayList =[{
          bothGoalH : data.teamAverageList[1].bothGoalH,
          bothGoalL : data.teamAverageList[1].bothGoalL,
          concededGameH : data.teamAverageList[1].concededGameH,
          concededGameHPer : data.teamAverageList[1].concededGameHPer,
          concededGameL : data.teamAverageList[1].concededGameL,
          concededGameLPer : data.teamAverageList[1].concededGameLPer,
          defeatsH : data.teamAverageList[1].defeatsH,
          defeatsL : data.teamAverageList[1].defeatsL,
          drawH : data.teamAverageList[1].drawH,
          drawL : data.teamAverageList[1].drawL,
          over25H : data.teamAverageList[1].over25H,
          over25L : data.teamAverageList[1].over25L,
          over35H : data.teamAverageList[1].over35H,
          over35L : data.teamAverageList[1].over35L,
          pointGameH : data.teamAverageList[1].pointGameH,
          pointGameHPer : data.teamAverageList[1].pointGameHPer,
          pointGameL : data.teamAverageList[1].pointGameL,
          pointGameLPer : data.teamAverageList[1].pointGameLPer,
          scoredGameH : data.teamAverageList[1].scoredGameH,
          scoredGameHPer : data.teamAverageList[1].scoredGameHPer,
          scoredGameL : data.teamAverageList[1].scoredGameL,
          scoredGameLPer : data.teamAverageList[1].scoredGameLPer,
          teamID : data.teamAverageList[1].teamID,
          totalGoalH : data.teamAverageList[1].totalGoalH,
          totalGoalHPer : data.teamAverageList[1].totalGoalHPer,
          totalGoalL : data.teamAverageList[1].totalGoalL,
          totalGoalLPer : data.teamAverageList[1].totalGoalLPer,
          winsH : data.teamAverageList[1].winsH,
          winsL : data.teamAverageList[1].winsL,
        }];

      this.groundLeagueList =[{
        bothGoalH : data.teamAverageList[2].bothGoalH,
        bothGoalL : data.teamAverageList[2].bothGoalL,
        concededGameH : data.teamAverageList[2].concededGameH,
        concededGameHPer : data.teamAverageList[2].concededGameHPer,
        concededGameL : data.teamAverageList[2].concededGameL,
        concededGameLPer : data.teamAverageList[2].concededGameLPer,
        defeatsH : data.teamAverageList[2].defeatsH,
        defeatsL : data.teamAverageList[2].defeatsL,
        drawH : data.teamAverageList[2].drawH,
        drawL : data.teamAverageList[2].drawL,
        over25H : data.teamAverageList[2].over25H,
        over25L : data.teamAverageList[2].over25L,
        over35H : data.teamAverageList[2].over35H,
        over35L : data.teamAverageList[2].over35L,
        pointGameH : data.teamAverageList[2].pointGameH,
        pointGameHPer : data.teamAverageList[2].pointGameHPer,
        pointGameL : data.teamAverageList[2].pointGameL,
        pointGameLPer : data.teamAverageList[2].pointGameLPer,
        scoredGameH : data.teamAverageList[2].scoredGameH,
        scoredGameHPer : data.teamAverageList[2].scoredGameHPer,
        scoredGameL : data.teamAverageList[2].scoredGameL,
        scoredGameLPer : data.teamAverageList[2].scoredGameLPer,
        teamID : data.teamAverageList[2].teamID,
        totalGoalH : data.teamAverageList[2].totalGoalH,
        totalGoalHPer : data.teamAverageList[2].totalGoalHPer,
        totalGoalL : data.teamAverageList[2].totalGoalL,
        totalGoalLPer : data.teamAverageList[2].totalGoalLPer,
        winsH : data.teamAverageList[2].winsH,
        winsL : data.teamAverageList[2].winsL,
      }];

    }, (err) => {
      console.log("data Error");
    });
  }


  matchHistoryFnc(type: any) {
    let postData = new FormData();
    postData.append('teamId', "1");

    if (type == "allMatch") {
      postData.append("sortType", "dateAsc");
      this.data = this.http.post(this.matchHistory_url, postData);
      this.data.subscribe(data => {
        this.allMatchList = data.matchHistoryList;
      }, (err) => {
        console.log("data Error");
      });
    } else if (type == "afterMatch") {
      postData.append("state", "after");
      postData.append("sortType", "dateDesc");
      this.data = this.http.post(this.matchHistory_url, postData);
      this.data.subscribe(data => {
        this.afterMatchList = data.matchHistoryList;
      }, (err) => {
        console.log("data Error");
      });
    } else if (type == "beforeMatch") {
      postData.append("state", "before");
      postData.append("sortType", "dateAsc");
      this.data = this.http.post(this.matchHistory_url, postData);
      this.data.subscribe(data => {
        this.beforeMatchList = data.matchHistoryList;
      }, (err) => {
        console.log("data Error");
      });
    }
  }


    //팀 랭킹정보
    nextMatchInfoFnc() {
      let postData = new FormData();
      postData.append('teamId', "1");
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
          teamImgH : data.nextMatchInfo[0].img,
          teamImgA : data.nextMatchInfo[1].img,
          teamRankInfoH : data.nextMatchInfo[0].rankInfo,
          teamRankInfoA : data.nextMatchInfo[1].rankInfo,
          homeGround : data.nextMatchInfo[0].homeGround,
          matchDate : data.nextMatchInfo[0].matchDate,
        }];

        console.log(data);
        console.log(this.nextMatchList);


      }, (err) => {
        console.log("data Error");
      });
    }



  /* toogle footer */
  footerExpanded() {
    console.log('Footer expanded!');
  }

  footerCollapsed() {
    console.log('Footer collapsed!');
  }

  toggleFooter() {
    this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }
  /* toggle end */


  /* slideFnc */
  ngAfterViewInit() {
    this.SwipedTabsSlider.autoHeight = true;
    this.slideDidChange();
  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
  }
  selectTab(index: any) {
    this.SwipedTabsIndicator.style.webkitTransform =
      "translate3d(" + 100 * index + "%,0,0)";
    this.SwipedTabsSlider.slideTo(index, 500);
  }
  updateIndicatorPosition() {
    if (
      this.SwipedTabsSlider.length() > this.SwipedTabsSlider.getActiveIndex()
    ) {
      this.SwipedTabsIndicator.style.webkitTransform =
        "translate3d(" +
        this.SwipedTabsSlider.getActiveIndex() * 100 +
        "%,0,0)";
    }
    this.slideDidChange();
  }
  animateIndicator($event: any) {
    if (this.SwipedTabsIndicator)
      this.SwipedTabsIndicator.style.webkitTransform =
        "translate3d(" + $event.progress * (this.SwipedTabsSlider.length() - 1);
  }

  slideDidChange() {
    setTimeout(() => {
      this.updateSliderHeight();
    }, 200);
  }

  slideWillChange() {
    this.slidesMoving = true;
  }

  updateSliderHeight() {
    this.slidesMoving = false;
    let slideIndex: number = this.SwipedTabsSlider.getActiveIndex();
    let currentSlide: Element = this.SwipedTabsSlider._slides[slideIndex];
    this.slidesHeight = currentSlide.clientHeight;
    this.SwipedTabsSlider._elementRef.nativeElement.querySelector(".swiper-wrapper"
    ).style.height = this.slidesHeight + "px";
  }
  /* slideFnc END*/

}
