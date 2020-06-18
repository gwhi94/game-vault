import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
const firebase = require("nativescript-plugin-firebase");
const firebaseApp = require("nativescript-plugin-firebase/app");

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection;
  
  signIn(email, password){  
    return firebase.login({     
        type: firebase.LoginType.PASSWORD,
        passwordOptions : {
          email:email,
          password:password
        }
      }
    )
  }

  signOut(){
    firebase.logout();

  }

  
  constructor() {this.userCollection = firebaseApp.firestore().collection("userCollection")}
  
  registerUser(email, password){
    return firebase.createUser({
      email:email,
      password:password
    }).then(
      function(result) {
        return result;
      },
      function(error){
        console.log("Could not create user");
      }
    )
  }

}
