import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'ns-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  constructor(
    private routerExtension: RouterExtensions,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routerExtension.navigate([{ outlets: { gamesTab: ["games"],topGamesTab: ["topGames"], addGamesTab: ["addGames"] } }], { relativeTo: this.activeRoute });
  }

}
