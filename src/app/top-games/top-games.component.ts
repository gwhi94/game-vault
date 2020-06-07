import { Component, OnInit } from '@angular/core';
import { UserCollectionService } from '../services/user-collection.service';

@Component({
  selector: 'ns-top-games',
  templateUrl: './top-games.component.html',
  styleUrls: ['./top-games.component.css']
})
export class TopGamesComponent implements OnInit {

  userGames = [];

  constructor(private userCollectionService:UserCollectionService) { }

  ngOnInit(): void { 

    this.getUserGames()


  }

  getUserGames(){
    this.userCollectionService.getUserCollection((games => {
      if(games){
        this.userGames.length = 0;
          games.forEach(game =>
             this.userGames.push(game));
      }
      this.rankGames();
    }))
  }

  rankGames(){
    console.log("USER", this.userGames);

    this.userGames.sort((a, b) => a.rating + b.rating);

    console.log("after sort", this.userGames);

  }
}
