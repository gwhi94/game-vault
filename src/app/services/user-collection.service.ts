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

  getUserCollection(callback:Function){

     
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

  addGameToUserCollection(game){

    console.log(this.uid);

    let gamesArr = [];

   

    const documentToUpdate = firebase.firestore().collection("userCollection").doc(this.uid);

    

   //almost there

    const docObject = documentToUpdate.onSnapshot(doc => {
      console.log("doc datas", doc.data());
      gamesArr = doc.games;
      console.log(gamesArr);
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
