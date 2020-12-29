import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { HttpModule} from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonPullupModule } from 'ionic-pullup';


import { MyApp } from './app.component';


import { HomePage } from '../pages/home/home';
import { MatchPage } from '../pages/matchPage/matchPage';
import { TeamPage } from '../pages/teamPage/teamPage';
import { NoticePage } from '../pages/noticePage/noticePage';
import { TeamListPage } from '../pages/teamListPage/teamListPage';
import { TabsPage } from '../pages/tabs/tabs';
import { TeamInfoPage } from '../pages/team-info/team-info';
import { TeamComparePage } from '../pages/team-compare/team-compare';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TeamPage,
    MatchPage,
    NoticePage,
    TabsPage,
    TeamListPage,
    TeamInfoPage,
    TeamComparePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonPullupModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MatchPage,
    TeamPage,
    NoticePage,
    TabsPage,
    TeamListPage,
    TeamInfoPage,
    TeamComparePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
