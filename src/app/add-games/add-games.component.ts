import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { GameSearchService } from '../services/game-search.service';
import { subscribeOn } from 'rxjs/operators';
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";



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

  constructor(private viewContainerRef: ViewContainerRef, private modalService: ModalDialogService,private gameSearchService:GameSearchService) { }

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
    console.log(item);

    this.gameSearchService.fetchGameSecondary(item.title, item.platform)
      .subscribe(res => {
        let result = res['result'];
        console.log(res['result']);

        this.detailGame = {
          title:result.title,
          releaseDate:result.releaseDate,
          genre:result.genre,
          image:result.image,
          developer:result.developer,
          publisher:result.publisher
        }

        this.showAddGameModal(this.detailGame);

            
      }
        
      );

      //trying to map this to the model.


  }

  showAddGameModal(detailGame){
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: true,
      context: {context:detailGame}
  };
  this.modalService.showModal(AddGameModalComponent, options);

  }

}
