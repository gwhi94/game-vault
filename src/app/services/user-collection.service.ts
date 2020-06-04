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
    let dateAdded = new Date(Date.now()).toLocaleString().split(',')[0];

    console.log("DATE", new Date(Date.now()).toLocaleString());
    
    let obJtoUpdate = {title:game.title, rating:game.rating, dateAdded:dateAdded}
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
    //we have to pull out all games and delete the specific one and re upload, due to firebase limitations
    const oldDocument = firestore.collection("userCollection").doc(this.uid);

    const gameTitleToUpdate = game.title;
    let games = [];
    
    oldDocument.get().then(doc => {
      doc.data().games.forEach(function(game){
        games.push(game);
      })

      var updatedGamesList = games.filter(game => game.title !== gameTitleToUpdate);
      var updatedGame = {title:game.title, rating:game.rating};
      updatedGamesList.push(updatedGame);
      const newDocument = firestore.collection('userCollection').doc(this.uid);
      newDocument.update({
        games:updatedGamesList
      })

    })

  }

  deleteGameInUserCollection(game){
   
    const documentToUpdate = firestore.collection("userCollection").doc(this.uid);
    const gameTitleToDelete = game.title;
    let games = [];

    documentToUpdate.get().then(doc => {
      doc.data().games.forEach(function(game){
        games.push(game);
      })

      var updatedGamesList = games.filter(game => game.title !== gameTitleToDelete);

      const newDocument = firestore.collection('userCollection').doc(this.uid);
      newDocument.update({
        games:updatedGamesList
      })

    })
    
  }
}
