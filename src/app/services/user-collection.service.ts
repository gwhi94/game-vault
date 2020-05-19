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
    
   }

  getUserCollection(callback:Function){

    this.uid = firebase.auth().currentUser;
    console.log("UID AT LOGIN", this.uid);
    
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
    this.uid = firebase.auth().currentUser;
    
    
    console.log("UIgD", this.uid);
    const query = this.userCollection.where("uid", "==", this.uid);
    console.log("QUERY", query);

  }


  


  initUserCollectionDocument(uid){
    return this.userCollection.doc("UserObject").set({
      uid:uid,
      games:[]
    })
  }



  updateGameInUserCollection(){

  }

  deleteGameInUserCollection(){
    
  }
}
