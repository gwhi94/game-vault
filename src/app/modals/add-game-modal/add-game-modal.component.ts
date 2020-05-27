import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
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

  constructor(private params: ModalDialogParams, private page:Page) {
    console.log("HIT MODAL");
    console.log("params", this.params.context.context);
    this.game = this.params.context.context;

    if(this.game.rating){
      this.score = this.game.rating;
      console.log(this.game.rating);
    }else{
      this.score = 0;
      console.log(this.game.rating);
    }
    
    
    this.page.on('loaded', args => {
      (<Page>args.object).backgroundColor = new Color('#00000000');
    });

  
   }

  ngOnInit(): void {

    console.log("modal init");

  
  }
  


  onShownModally(args){
    console.log(args);
    console.log("shown");
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
