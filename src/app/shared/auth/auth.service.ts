// import { Router } from "@angular/router";
// import { Injectable } from "@angular/core";
// import { AngularFireAuth } from "@angular/fire/auth";
// import firebase from "firebase/app";
// import { Observable } from "rxjs";

// @Injectable()
// export class AuthService {
//   private user: Observable<firebase.User>;
//   private userDetails: firebase.User = null;

//   private token: string;

//   constructor(public _firebaseAuth: AngularFireAuth, public router: Router) {
//     this.user = _firebaseAuth.authState;
//     this.user.subscribe((user) => {
//       if (user) {
//         this.userDetails = user;
//       } else {
//         this.userDetails = null;
//       }
//     });
//   }

//   /**
//    * to append access token in header.
//    */
//   setAuthToken(token) {
//     this.token = token;
//   }

//   getToken(): string {
//     return this.token;
//   }

//   signupUser(email: string, password: string) {
//     //your code for signing up the new user
//   }

//   signinUser(email: string, password: string) {
//     //your code for checking credentials and getting tokens for for signing in user
//     return this._firebaseAuth.signInWithEmailAndPassword(email, password);
//   }

//   logout() {
//     // this._firebaseAuth.signOut();
//     // this.router.navigate(["YOUR_LOGOUT_URL"]);
//     this.token = null;
//     // this.loginService.access_token = null;
//     window.open("/", "_self");
//   }

//   isAuthenticated() {
//     return true;
//   }
// }

import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Injectable } from "@angular/core";
import { lineChartLabels } from "../data/chartjs";
import { LoginService } from "../services/login.service";

@Injectable()
export class AuthService {
  token: string;

  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    public loginService: LoginService
  ) {}

  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }

  signinUser(email: string, password: string) {
    //your code for checking credentials and getting tokens for for signing in user
  }

  logout() {
    this.token = null;
    this.loginService.access_token = null;
    window.open("/", "_self");
  }

  getToken() {
    return this.token;
  }

  /**
   * to append access token in header.
   */
  setAuthToken(token) {
    this.token = token;
  }

  isAuthenticated() {
    // if ((this.loginService.otp2FA && this.loginService.otp2FA != undefined) && this.loginService.otp2FA != '') {
    //   return true;
    // }
    if (
      this.loginService.access_token &&
      this.loginService.access_token !== undefined &&
      this.loginService.access_token !== ""
    ) {
      return true;
    } else {
      // this.router.navigate(["/pages/login"]);
      // return false; // not allowed to enter without credential
    }
  }
}
