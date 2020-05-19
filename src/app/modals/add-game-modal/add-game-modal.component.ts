import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

import { GameDetail } from '../../shared/game-detail';

@Component({
  selector: 'ns-add-game-modal',
  templateUrl: './add-game-modal.component.html',
  styleUrls: ['./add-game-modal.component.css']
})
export class AddGameModalComponent implements OnInit {

  game:GameDetail;

  constructor(private params: ModalDialogParams) { }

  ngOnInit(): void {
    console.log("params", this.params);
    this.game = this.params.context.context;
    console.log(this.game.description);
  
  }

  onShownModally(args){
    console.log(args);
    console.log("shown");
  }

  close() {
    this.params.closeCallback(this.game);
}

}
