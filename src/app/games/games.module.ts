import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { GamesComponent } from './games.component';
import { CardOptionsModalComponent } from '../modals/card-options-modal/card-options-modal.component';
import { SearchPipe } from './games.component';


@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            { path: "", redirectTo: "games" },
            { path: "games", component: GamesComponent },
            //{ path: "player/:id", component: PlayerDetailComponent},
        ])
  ],
  declarations:[
    GamesComponent,
    CardOptionsModalComponent,
    SearchPipe
  ],
  entryComponents : [
    CardOptionsModalComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GamesModule { }
