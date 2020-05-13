import { Component, OnInit, ViewContainerRef  } from '@angular/core';
const firebase = require("nativescript-plugin-firebase/app");
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
import { UserCollectionService } from "../services/user-collection.service";

@Component({
  selector: 'ns-games',
  moduleId: module.id,
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  userId:string;
  userCollections = new ObservableArray();
  userGames = new ObservableArray();
  loaded:Boolean = true;


  constructor(private userCollectionService:UserCollectionService) { }

  ngOnInit(): void {
      this.userCollectionService.getUserCollection((collections) => {
          this.userCollections.length = 0;
          this.userGames.length = 0;
          const tempCollections = <any>collections;
          tempCollections.forEach((collection) => {
              this.userCollections.push(collection)
          })
          this.formGameCollection();
      })         
  }

  formGameCollection(){   
      this.userCollections.getItem(0).games.forEach(games => {
          this.userGames.push(games)
      })
  }

}
