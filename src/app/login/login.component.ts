import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";

import { User } from "../shared/user.model";
import { UserService } from "../services/user.service";

import { UserCollectionService } from '../services/user-collection.service';

@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    isLoggingIn = true;
    user: User;
    processing = false;
    @ViewChild("password", {static: false}) password: ElementRef;
    @ViewChild("confirmPassword", {static: false}) confirmPassword: ElementRef;

    constructor(private page: Page, private userCollectionService:UserCollectionService, private userService: UserService, private routerExtensions: RouterExtensions) {
        this.page.actionBarHidden = true;
        this.user = new User();
        this.user.email = "dev@game-vault.com";
        this.user.password = "password";
    }

    ngOninit(){
        this.submit();
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {

        console.log(this.user);
        if (!this.user.email || !this.user.password) {
            this.alert("Please provide both an email address and password.");
            return;
        }

        this.processing = true;
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.register();
        }
    }

    login() {
        this.userService.signIn(this.user.email,this.user.password)
            .then(() => {
                console.log("Logging in");
                this.processing = false;
                this.routerExtensions.navigate(["../tabs/default"], { clearHistory: true });
            })
            .catch(() => {
                this.processing = false;
                this.alert("Unfortunately we could not find your account.");
            });
    }

    register() {
      console.log(this.user.email, this.user.password);

      this.userService.registerUser(this.user.email, this.user.password)
        .then((result) => {
            console.log(result)

            this.userCollectionService.initUserCollectionDocument(result.uid)
                .then(() => {
                    this.login();
                })
           
        })
      .catch((result) => {
          console.log(result);
          console.log("User not registered, component")
      })
    }

    forgotPassword() {
         prompt({
            title: "Forgot Password",
            message: "Enter the email address you used to register for Game Vault to reset your password.",
            inputType: "email",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then((data) => {
            if (data.result) {
                this.userService.resetPassword(data.text.trim())
                    .then(() => {
                        this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                    }).catch(() => {
                        this.alert("Unfortunately, an error occurred resetting your password.");
                    });
            }
        }); 
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }
    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    }

    alert(message: string) {
        return alert({
            title: "APP NAME",
            okButtonText: "OK",
            message: message
        });
    }
}

