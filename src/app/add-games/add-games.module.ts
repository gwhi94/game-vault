import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AddGamesComponent } from './add-games.component';



@NgModule({

  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            { path: "", redirectTo: "addGames" },
            { path: "addGames", component: AddGamesComponent },
            //{ path: "player/:id", component: PlayerDetailComponent},
        ])
  ],
  declarations:[
    AddGamesComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AddGamesModule { }
