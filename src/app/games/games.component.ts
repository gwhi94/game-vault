import { Component, OnInit, ViewContainerRef } from '@angular/core';
const firebase = require("nativescript-plugin-firebase/app");
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
import { UserCollectionService } from "../services/user-collection.service";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { registerElement } from "nativescript-angular/element-registry";
import { CardView } from 'nativescript-cardview';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { CardOptionsModalComponent } from '../modals/card-options-modal/card-options-modal.component';

registerElement("CardView", () => CardView);

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


  constructor(private userCollectionService:UserCollectionService, private viewContainerRef: ViewContainerRef, private modalService: ModalDialogService) { }

    ngOnInit(): void {
      this.getUserGames();


    }

    getUserGames(){
      this.userCollectionService.getUserCollection((games) => {
        this.userGames.length = 0;
        if(games){
          games.forEach(game => {
              this.userGames.push(game);
          })
        }else{
          console.log("User games is null");
          this.getUserGames();

        }
      });

    }

    deleteGame(game){
      console.log("del", game);
    }
    
    cardOptions(game){
      console.log("Fired", game);
      const options: ModalDialogOptions = {
        viewContainerRef: this.viewContainerRef,
        fullscreen: false,
        context: {context:game}
    };
    return this.modalService.showModal(CardOptionsModalComponent, options);
    }


}

  
        
    
    
    
 