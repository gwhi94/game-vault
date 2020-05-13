import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NSEmptyOutletComponent } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginComponent} from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TabsComponent } from "./tabs/tabs.component";

export const COMPONENTS = [LoginComponent, WelcomeComponent];

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    {
        path: "login", component: LoginComponent
    },
    {
        path: "welcome", component: WelcomeComponent
    },
    {
        path: "tabs",
        //component:TabsComponent,
        
        loadChildren: () => import("~/app/tabs/tabs.module").then(m => m.TabsModule),
    },
];


@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes, { enableTracing: true })],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
