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

  updateGameInUserCollection(game){
    const oldDocument = firestore.collection("userCollection").doc(this.uid);

    const gameTitleToUpdate = game.title;
    let games = [];

    console.log("title", gameTitleToUpdate);

    
    oldDocument.get().then(doc => {
      console.log("DATA", doc.data());
      doc.data().games.forEach(function(game){
        games.push(game);
      })

      console.log("gamesarr", games);

      var updatedGamesList = games.filter(game => game.title !== gameTitleToUpdate);

      console.log(updatedGamesList);

      var updatedGame = {title:game.title, rating:game.rating};

      updatedGamesList.push(updatedGame);

      const newDocument = firestore.collection('userCollection').doc(this.uid);


      newDocument.update({
        games:updatedGamesList
      })

      




    })

    



  }

  deleteGameInUserCollection(){
    
  }
}
