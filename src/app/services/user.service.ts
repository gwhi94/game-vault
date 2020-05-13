import { Injectable } from '@angular/core';
const firebase = require("nativescript-plugin-firebase");

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
    

  constructor() { }

}
