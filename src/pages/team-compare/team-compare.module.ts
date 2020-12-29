import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamComparePage } from './team-compare';

@NgModule({
  declarations: [
    TeamComparePage,
  ],
  imports: [
    IonicPageModule.forChild(TeamComparePage),
  ],
})
export class TeamComparePageModule {}
