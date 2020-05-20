import { Component, OnInit, ViewContainerRef  } from '@angular/core';
const firebase = require("nativescript-plugin-firebase/app");
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
import { UserCollectionService } from "../services/user-collection.service";
import { SearchBar } from "tns-core-modules/ui/search-bar";


@Component({
  selector: 'ns-games',
  moduleId: module.id,
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  userId:string;
  userGames = new ObservableArray();
  loaded:Boolean = true;


  constructor(private userCollectionService:UserCollectionService) { }

  ngOnInit(): void {

    this.userCollectionService.getUserCollection((games) => {
        console.log("Games", games);

        games.forEach(game => {
            this.userGames.push(game);
        })
    });


}

}

  
        
    
    
    
    
    
    
    
    
    
    
    /* .then(result => {
            console.log("RESULT", result);
            this.userGames.length = 0;
            result.forEach(game => {
                this.userGames.push(game)
            });

       

            
        }) */
    
 