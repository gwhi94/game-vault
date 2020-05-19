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
    console.log(email,password);
    console.log(firebase);
    
    return firebase.login({
      
        type: firebase.LoginType.PASSWORD,
        passwordOptions : {
          email:email,
          password:password
        }
      }
    )
  }

  
  constructor() {this.userCollection = firebaseApp.firestore().collection("userCollection")}
  
  registerUser(email, password){
    console.log(email);
    return firebase.createUser({
      email:email,
      password:password
    }).then(
      function(result) {
        console.log(result);
        console.log("User Created");
        return result;
      },
      function(error){
        console.log("Could not create user");
      }
    )
  }

}
