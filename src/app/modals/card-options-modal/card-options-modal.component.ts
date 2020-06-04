import { Component, OnInit , ViewChild, ElementRef, NgZone} from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { Page } from 'tns-core-modules/ui/page/page';
import { UserCollectionService } from '~/app/services/user-collection.service';

import { GameDetail } from '../../shared/game-detail';


@Component({
  selector: 'ns-card-options-modal',
  templateUrl: './card-options-modal.component.html',
  styleUrls: ['./card-options-modal.component.css']
})
export class CardOptionsModalComponent implements OnInit {

  game:GameDetail;
  score:Number;

  constructor(public zone:NgZone, private params: ModalDialogParams, private page:Page, private userCollectionService: UserCollectionService) { 
    setTimeout(() => {
      this.zone.run(() => this.loadModal())
  });
  }

  ngOnInit(): void {
  }

  loadModal(){
    this.game = this.params.context.context;
    this.score = this.game.rating;
    console.log(this.game);
  }
  
  setScore(args: any){

    if(this.game){
      this.score = Number(args.object.get('value'));      
      console.log("here", this.score); 
      this.game.rating = this.score;
    }
 
  }

  changeScore(){
    console.log(this.game);
    this.userCollectionService.updateGameInUserCollection(this.game)
    this.close();
    
  }

  deleteGame(){
    this.userCollectionService.deleteGameInUserCollection(this.game);
    this.close();
  }


  close() {
    this.params.closeCallback(this.game);
  }

}