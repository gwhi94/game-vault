import { Component, OnInit } from '@angular/core';
import { GameSearchService } from '../services/game-search.service';
import { subscribeOn } from 'rxjs/operators';
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;

@Component({
  selector: 'ns-add-games',
  templateUrl: './add-games.component.html',
  styleUrls: ['./add-games.component.css']
})
export class AddGamesComponent implements OnInit {

  private subscription1;

  searchGames = new ObservableArray();

  constructor(private gameSearchService:GameSearchService) { }

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
      .subscribe(res => console.log(res));


  }

}
