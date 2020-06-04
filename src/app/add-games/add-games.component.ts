import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { GameSearchService } from '../services/game-search.service';
import { subscribeOn } from 'rxjs/operators';
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";

import { UserCollectionService } from '../services/user-collection.service';

const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;

import { GameDetail } from '../shared/game-detail';
import { AddGameModalComponent } from '../modals/add-game-modal/add-game-modal.component';

@Component({
  selector: 'ns-add-games',
  templateUrl: './add-games.component.html',
  styleUrls: ['./add-games.component.css']
})
export class AddGamesComponent implements OnInit {

  private subscription1;

  searchGames = new ObservableArray();

  detailGame: GameDetail;

  constructor(private userCollectionService: UserCollectionService, private viewContainerRef: ViewContainerRef, private modalService: ModalDialogService,private gameSearchService:GameSearchService) { }

  ngOnInit(): void {
   
  }

  onSubmit(args){
    const searchBar = args.object as SearchBar;
    console.log(`Searching for ${searchBar.text}`);

    this.gameSearchService.fetchGamesPrimary(searchBar.text)
      .subscribe(res => {
        console.log(res);
        this.searchGames = res['result'];
      })

  }

  inspectGame(item){

    this.gameSearchService.fetchGameSecondary(item.title, item.platform)
      .subscribe(res => {
        let result = res['result'];
        console.log("REZ", result);

        this.detailGame = {
          title:result.title,
          releaseDate:result.releaseDate,
          genre:result.genre,
          image:result.image,
          developer:result.developer,
          publisher:result.publisher,
          description:result.description,
          rating:0
          
        }

       this.checkForExisting()

        //run checks here to see if user has already got this game in library

      }       
      );

      //trying to map this to the model.

  }

  checkForExisting(){
    console.log("HIT");
    this.userCollectionService.getUserCollection((games) => {
      if(games){
        let matchCount = 0;
        var rating = 0;

        for (let i = 0; i < games.length;i++){
          if(this.detailGame.title == games[i].title){
            console.log("Found Match");
            matchCount ++;
            rating = games[i].rating;

          }
        }

        if(matchCount > 0){
          console.log("Game Does Exist");
          //this.popModal(rating);
          this.showAddGameModal(this.detailGame, rating).then(result => {
 
            this.updateGameInLibrary(result);
          });
        }else if(matchCount == 0){
          console.log("Game Does not Exist");
          //this.popModal(null);
          console.log("Detail game", this.detailGame);
          this.showAddGameModal(this.detailGame, null).then(result => {      
            this.addGameToLibrary(result);
          });
        }

      }else{
        console.log("Null games list");
          
      }
    });
  }

  popModal(rating){
    console.log("hit2", rating);
    
    

  }

  showAddGameModal(detailGame, rating): Promise<any> {
    console.log("hit show modal");

    if(rating){
      detailGame.rating = rating;
    }

    console.log(detailGame);

    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: true,
      context: {context:detailGame}
  };
  return this.modalService.showModal(AddGameModalComponent, options);

  }

  updateGameInLibrary(game){
    this.userCollectionService.updateGameInUserCollection(game);

  }



  addGameToLibrary(game){
    this.userCollectionService.addGameToUserCollection(game);
      /* .then((result) => {
        console.log("Game Added", result)
      }) */

    

  }

}
