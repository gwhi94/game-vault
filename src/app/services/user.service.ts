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

  resetPassword(email){

    let passWordReset;
     
    firebase.sendPasswordResetEmail(email)
      .then(() => {
        console.log("Password Reset Sent");
        passWordReset = true;
      }).catch(error => {
        console.log("Could not reset password");
        passWordReset = null
      })     

      return passWordReset;
           
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
        if(error == 'Creating a user failed. com.google.firebase.auth.FirebaseAuthUserCollisionException: The email address is already in use by another account.'){           
            return 'userExists';         
        }
      }
    )
  }
}
