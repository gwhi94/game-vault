import { Component, OnInit, ViewContainerRef,  PipeTransform, Pipe} from '@angular/core';
const firebase = require("nativescript-plugin-firebase/app");
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
import { UserCollectionService } from "../services/user-collection.service";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { registerElement } from "nativescript-angular/element-registry";
import { CardView } from 'nativescript-cardview';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { CardOptionsModalComponent } from '../modals/card-options-modal/card-options-modal.component';
import { pipe } from 'rxjs';
import { UserService } from '../services/user.service';

import { RouterExtensions } from 'nativescript-angular/router';

registerElement("CardView", () => CardView);

@Pipe({
  name:'searchPipe'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchPhrase: string): any[] {
    console.log("hit");

    if(!items) return[];
    if(!searchPhrase) return items;
    searchPhrase = searchPhrase.toLowerCase();
    console.log("sp", searchPhrase);
    
      return items.filter(item => {
        return item.title.toLowerCase().includes(searchPhrase)  
     
      });
  }
}

@Component({
  selector: 'ns-games',
  moduleId: module.id,
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  userId:string;
  userGames = [];
  loaded:Boolean = true;
  searchPhrase = '';
  loading = true;
  
  
  constructor(public routerExtensions:RouterExtensions,private userService:UserService,private userCollectionService:UserCollectionService, private viewContainerRef: ViewContainerRef, private modalService: ModalDialogService) { }
  
  
  ngOnInit(): void {
    this.getUserGames();
     
  }

  loadedSB(args) { 
    setTimeout(() => {
        args.object.dismissSoftInput();
    }, 200)
    
  }

  logOut(){
    console.log("Log Out");
    this.userService.signOut();
    this.routerExtensions.navigateByUrl('/');

    
  }

    getUserGames(){
      console.log("hit get games");
      this.userCollectionService.getUserCollection((games) => {
        this.userGames.length = 0;  
        this.userGames = [];
        console.log(games);
        if(games){
          this.userGames.length = 0;
            games.forEach(game =>
               this.userGames.push(game));
        }else{
          console.log("Null games");
          let that = this;

         /*  setTimeout(function(){
            that.getUserGames()
          }, 1500) */
        }
          this.loading = false;
      });
    }

    filterGames(args){
      const searchBar = args.object as SearchBar;
      this.searchPhrase = searchBar.text;   
    }

    cardOptions(game, newRating){
      if(newRating){
        console.log("new rating", Number(newRating.object.get('value')))
      }

      const options: ModalDialogOptions = {
        viewContainerRef: this.viewContainerRef,
        fullscreen: false,
        context: {context:game}
        //trying to get a callback here to refresh games list
    };
  
     this.modalService.showModal(CardOptionsModalComponent, options)
      .then(response => {
          console.log("CLOSED dMODAL", response);

           if(response.action == 'delete'){
            this.userGames = this.userGames.filter(function(obj){
              return obj.title !== response.game
            })
          }/* else if(response.action == 'modify'){
         
            let index = this.userGames.findIndex((obj => obj.title == response.game));
            this.userGames[index].rating = response.newRating;
          } */
      })
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

    sortByHighest(){
      this.userGames.sort((a, b) => b.rating - a.rating);
    }
}

  
        
    
    
    
 