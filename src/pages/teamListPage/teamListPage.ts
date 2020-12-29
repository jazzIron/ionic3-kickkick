import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environment';
import { Observable } from 'rxjs/Observable';
import { TeamInfoPage } from '../team-info/team-info';

@Component({
  selector: 'page-teamListPage',
  templateUrl: 'teamListPage.html',
})
export class TeamListPage {

  api_url:any;
  data: Observable<any>;
  teamList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.api_url = environment.getTeamInfo;
    this.getTeamList();
  }
  getTeamList(){
    let postData =new FormData();
    postData.append('areaType',"E");
    this.data =this.http.post(this.api_url, postData);
    this.data.subscribe(data =>{
          this.teamList = data.teamInfoList ;
      },(err) =>{
        console.log("data Error");
      });
  }

  detailTeam(teamId){
    this.navCtrl.push(TeamInfoPage, teamId);
  }

}
