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

  borderFunc(game){
    if(game.rating <=1){
      return '#b71c1c'
    }else if(game.rating <=3){
      return '#e94236'
    }else if(game.rating <=5){
      return '#1eb980'
    }
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

    this.userGames.sort((a, b) => b.rating - a.rating);

    console.log("after sort", this.userGames);

  }
}
