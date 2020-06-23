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
  
   }

  getUserCollection(callback:Function) {   
    console.log("GET USER COLLECTION --- "); 

    firebasePlugin.getCurrentUser()
    .then(
      user => {
        console.log("HERE", user);
        this.uid = user.uid;
        const usersDocument = firestore.collection("userCollection").doc(this.uid);

        console.log("DOC --- " , usersDocument)
   
        usersDocument.onSnapshot(querySnapshot => {
          callback(this.handleQuery(querySnapshot))
        })
      }
    )
  
  }

  handleQuery(querySnapshot){ 
    console.log("Hit handle");
    if(querySnapshot.data()){
      console.log("handle games");
      return(querySnapshot.data().games)
    }else{
      return null;
    }
  }


  addGameToUserCollection(game){
    let date = new Date().toLocaleDateString();
    let obJtoUpdate = {title:game.title, rating:game.rating, dateAdded:date}
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
    console.log("SERV CALLED");
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
