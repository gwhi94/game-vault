import { Injectable, NgZone } from '@angular/core';
import { firestore } from "nativescript-plugin-firebase";
import { Observable, of } from 'rxjs'

const firebase = require("nativescript-plugin-firebase/app");
const firebasePlugin = require("nativescript-plugin-firebase");





@Injectable({
  providedIn: 'root'
})
export class UserCollectionService {
  userCollection;
  uid:string;

  constructor() {
    this.userCollection = firebase.firestore().collection("userCollection");
    firebasePlugin.getCurrentUser()
      .then(
        user => {
          console.log("HERE", user);
          this.uid = user.uid
        }
      )
 
   }

  getUserCollection(callback:Function) {    

    const usersDocument = firestore.collection("userCollection").doc(this.uid);
   
      usersDocument.onSnapshot(querySnapshot => {
        callback(this.handleQuery(querySnapshot))
      })
  
  }

  handleQuery(querySnapshot){ 
    if(querySnapshot.data()){
      return(querySnapshot.data().games)
    }else{
      return null;
    }
  }


  addGameToUserCollection(game){
    let obJtoUpdate = {title:game.title, rating:game.rating}
    const documentToUpdate = firestore.collection("userCollection").doc(this.uid);
    documentToUpdate.update({
      games: firestore.FieldValue.arrayUnion(obJtoUpdate)
    })
  }

  initUserCollectionDocument(uid){
    return this.userCollection.doc(uid).set({
      games:[]
    })
  }

  updateGameInUserCollection(){

  }

  deleteGameInUserCollection(){
    
  }
}
