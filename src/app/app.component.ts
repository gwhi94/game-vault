import { Component, OnInit } from "@angular/core";
import * as app from "tns-core-modules/application";
const firebase = require("nativescript-plugin-firebase");


@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    constructor() {
      console.log('---------file:',app.getCssFileName());
      //app.setCssFileName("../_app.common.scss");
      console.log('---------file:',app.getCssFileName());
      //app.loadAppCss();
        // Use the component constructor to inject providers.
       
    }

    ngOnInit(): void {
        // Init your component properties here.
        firebase.init({
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
          }).then(
            () => {
              console.log("firebase.init done");
            },
            error => {
              console.log(`firebase.init error: ${error}`);
            }
          );
        
    }
}
