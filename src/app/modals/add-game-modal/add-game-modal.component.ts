import { Component, OnInit , ViewChild, ElementRef, NgZone} from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";


import * as application from "tns-core-modules/application";

import { GameDetail } from '../../shared/game-detail';
import { Page } from 'tns-core-modules/ui/page/page';

declare var android: any;
const Color = require("tns-core-modules/color").Color;

@Component({
  selector: 'ns-add-game-modal',
  templateUrl: './add-game-modal.component.html',
  styleUrls: ['./add-game-modal.component.css']
})
export class AddGameModalComponent implements OnInit {
  
  @ViewChild('root', {static:false}) root: ElementRef;
  //this is not used anymore -- get rid

  game:GameDetail;
  score:Number = 0;
  existingGame = false;

  constructor(public zone:NgZone, private params: ModalDialogParams, private page:Page) {

    //workaround for nativescript bug https://github.com/NativeScript/nativescript-angular/issues/1014
      setTimeout(() => {
        this.zone.run(() => this.loadModal())
    });

   }

  ngOnInit() {}

  loadModal(){
    
    console.log("HIT MODAL");
    console.log("params", this.params.context.context);
    this.game = this.params.context.context;

    //if rating is passed then game exists.
    if(this.game.rating){
      this.existingGame = true;
      this.score = this.game.rating;
      console.log(this.game.rating);
    }else{
      this.existingGame = false;
      this.score = 0;
      console.log(this.game.rating);
    }
 
  }
  setScore(args: any){
    this.score = Number(args.object.get('value'));
    console.log(this.score);
    this.game.rating = this.score;

  }

  close() {
    this.params.closeCallback(this.game);
  }

}
