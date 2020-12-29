import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environment';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TeamInfoPage } from '../team-info/team-info';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

@Injectable()
export class HomePage {

  api_url:any;
  data: Observable<any>;

  teamRankInfoList:any = [];

  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.api_url = environment.teamRankList;

    this.teamRankList();
  }


    //팀 랭킹리스트
    teamRankList(){
      let postData =new FormData();
      postData.append('teamId', "ALL");
      postData.append('areaType',"E");
      this.data =this.http.post(this.api_url, postData);

      this.data.subscribe(data =>{
          console.log(data);
            this.teamRankInfoList = data.teamRankList ;
        },(err) =>{
          console.log("data Error");
        });
    }

    detailTeam(teamId){
      this.navCtrl.push(TeamInfoPage, teamId);
    }

}
