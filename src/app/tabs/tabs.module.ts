import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "nativescript-angular/router";
import { TabsComponent } from "./tabs.component";


@NgModule({
  imports: [
      
      NativeScriptCommonModule,
      NativeScriptRouterModule,
      NativeScriptRouterModule.forChild([
          {
              path: "default", component: TabsComponent, children: [
                  {
                      path: "games",
                      outlet: "gamesTab",
                      component: NSEmptyOutletComponent,
                      loadChildren: () => import("~/app/games/games.module").then(m => m.GamesModule),
                  },
                  {
                      path: "addGames",
                      outlet: "addGamesTab",
                      component: NSEmptyOutletComponent,
                      loadChildren: () => import("~/app/add-games/add-games.module").then(m => m.AddGamesModule),
                  }
              ]
          }
      ])
      
  ],
  declarations: [
    TabsComponent
  ],
  providers: [
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TabsModule { }
