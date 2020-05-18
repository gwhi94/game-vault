import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AddGamesComponent } from './add-games.component';
import { AddGameModalComponent } from '../modals/add-game-modal/add-game-modal.component';



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
    AddGamesComponent, 
    AddGameModalComponent
  ],
  entryComponents: [
    AddGameModalComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AddGamesModule { }
