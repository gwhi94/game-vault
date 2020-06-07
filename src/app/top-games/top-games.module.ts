import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { TopGamesComponent } from './top-games.component';



@NgModule({
  declarations: [TopGamesComponent],
  imports: [
  NativeScriptCommonModule,
  NativeScriptRouterModule,
      NativeScriptRouterModule.forChild([
         { path: "", redirectTo: "topGames" },
          { path: "topGames", component: TopGamesComponent },
          //{ path: "player/:id", component: PlayerDetailComponent},
      ])
    ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TopGamesModule { }
