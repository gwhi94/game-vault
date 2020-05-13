import { Injectable, NgZone } from '@angular/core';
import { firestore } from "nativescript-plugin-firebase";
import { Observable, of } from 'rxjs'

const firebase = require("nativescript-plugin-firebase/app");


@Injectable({
  providedIn: 'root'
})
export class UserCollectionService {
  userCollection;
  uid:string = 'testUID'

  constructor() {
    this.userCollection = firebase.firestore().collection("userCollection");
   }

  getUserCollection(callback:Function){
    console.log("hit");
    const query = this.userCollection.where("uid", "==", this.uid);
      query
        .onSnapshot(querySnapshot => {
          callback(this.parseSnapshot(querySnapshot))
        })   
 
  }

  parseSnapshot(querySnapshot){
    const collection = [];
    querySnapshot.forEach(doc => {
      var dataToSave = doc.data();
      dataToSave.id = doc.id;
      collection.push(dataToSave);           
    });
    return(collection);

  }

  

  updateGameInUserCollection(){

  }

  deleteGameInUserCollection(){
    
  }
}
