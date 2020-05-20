import { Injectable, NgZone } from '@angular/core';
import { firestore } from "nativescript-plugin-firebase";
import { Observable, of } from 'rxjs'

const firebase = require("nativescript-plugin-firebase/app");

const firebasePlugin = require("nativescript-plugin-firebase");
//gonna try this


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
   
    /* return usersDocument.get()
      .then((res) => {
        return res.data().games
      }) */

      usersDocument.onSnapshot(querySnapshot => {
        callback(this.func(querySnapshot))
      })
  
 
    /* const query = this.userCollection.where("uid", "==", this.uid);
      query
        .onSnapshot(querySnapshot => {
          callback(this.parseSnapshot(querySnapshot))
        })    */
 
  }

  func(querySnapshot){
    console.log("query", querySnapshot.data().games);

    return(querySnapshot.data().games)
  }

/*   parseSnapshot(querySnapshot){
    const collection = [];
    querySnapshot.forEach(doc => {
      var dataToSave = doc.data();
      dataToSave.id = doc.id;
      collection.push(dataToSave);           
    });
    return(collection);

  } */

  addGameToUserCollection(game, rating){

    let obJtoUpdate = {title:game.title, rating:5}
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
