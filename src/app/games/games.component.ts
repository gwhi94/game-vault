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
  
  
  constructor(private userCollectionService:UserCollectionService, private viewContainerRef: ViewContainerRef, private modalService: ModalDialogService) { }
  
  
  ngOnInit(): void {
    const gamesFromSource = []; 
    this.getUserGames();
     
  }



    getUserGames(){
      this.userCollectionService.getUserCollection((games) => {
        this.userGames.length = 0;
        if(games){
          games.forEach(game => {
              this.userGames.push(game);
          })
          //this.loading = false;
        }else{
          console.log("User games is null");
          this.getUserGames();

        }
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
    };
    return this.modalService.showModal(CardOptionsModalComponent, options);
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

  
        
    
    
    
 