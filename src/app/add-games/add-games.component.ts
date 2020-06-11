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
  rating = 0;
  userGames = [];
  loading = true;

  constructor(private userCollectionService: UserCollectionService, private viewContainerRef: ViewContainerRef, private modalService: ModalDialogService,private gameSearchService:GameSearchService) { }

  ngOnInit(): void {
    this.userCollectionService.getUserCollection((games => {
      this.userGames = games;
    }))
   
  }

  onSubmit(args){
    const searchBar = args.object as SearchBar;
    this.gameSearchService.fetchGamesPrimary(searchBar.text)
      .subscribe(res => {
        this.searchGames = res['result'];
      })

  }

  inspectGame(item){
    this.gameSearchService.fetchGameSecondary(item.title, item.platform)
      .subscribe(res => {
        let result = res['result'];

        if(result){
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
        }

      }       
      );



  }

  checkForExisting(){
      if(this.userGames){
        let matchCount = 0;
        var rating = 0;

        for (let i = 0; i < this.userGames.length;i++){
          if(this.detailGame.title == this.userGames[i].title){
            matchCount ++;
            rating = this.userGames[i].rating;

          }
        }

        if(matchCount > 0){
          this.rating = rating;     

        }else if(matchCount == 0){
          this.rating = null;
     
        }

      }else{
        console.log("Null games");
          
      }
      
      this.showAddGameModal(this.detailGame, this.rating);
  
  }





  showAddGameModal(detailGame, rating) {
    console.log("hit show modal");

    if(rating){
      detailGame.rating = rating;
    }

    console.log("DETAI GAME", detailGame);

    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: true,
      context: {context:detailGame}
    };
  
    this.modalService.showModal(AddGameModalComponent, options);

  }

 

}
