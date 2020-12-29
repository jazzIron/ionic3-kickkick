import { Component } from '@angular/core';




import { HomePage } from '../home/home';
import { MatchPage } from './../matchPage/matchPage';
import { TeamPage } from './../teamPage/teamPage';
import { NoticePage } from './../noticePage/noticePage';
import { TeamListPage } from './../teamListPage/teamListPage';
import { TeamInfoPage } from '../team-info/team-info';
import { TeamComparePage } from '../team-compare/team-compare';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  //tab1Root = TeamInfoPage;
  tab2Root = MatchPage;
  tab3Root = TeamListPage;
  tab4Root = NoticePage;

  constructor() {

  }
}
