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

  game:GameDetail;

  score = 0;

  constructor(private params: ModalDialogParams, private page:Page) {

  
   }

  ngOnInit(): void {

    this.page.on('loaded', args => {
      (<Page>args.object).backgroundColor = new Color('#00000000');
    });
   
    
    
    console.log("params", this.params);
    this.game = this.params.context.context;
    console.log(this.game.description);
  
  }
  


  onShownModally(args){
    console.log(args);
    console.log("shown");
  }


  setScore(event){
    console.log(event);
  }

  close() {
    this.params.closeCallback(this.game);
}

}
