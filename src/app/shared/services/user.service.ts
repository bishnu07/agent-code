import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { Http, Response, RequestOptions, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { AppService } from "../../app.service";
import { Observable } from "rxjs/Observable";
import Swal from "sweetalert2";
import { LoginService } from "./login.service";
// import { BranchesService } from "../../branches/branches.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public editUserDetails: any;
  public access_token: any;
  public editUserID: any;
  public userFormTamplateId: any;
  public userCreation: Object;
  public tabIndex: any;

  public headers = new Headers({
    "Content-Type": "application/json",
    // 'Authorization':this.loginService.bearer_token
  });
  // public options = new RequestOptions({ headers: this.headers });

  constructor(
    // private http: Http,
    private loginService: LoginService,
    private commonservice: AppService,
    // private branchesService: BranchesService,
    private _httpClient: HttpClient
  ) {
    this.access_token = loginService.access_tokenMethod();
  }

  // getUserForms() {
  //   return this.http
  //     .get(
  //       this.commonservice.rootURL +
  //         "/users/forms?access_token=" +
  //         this.access_token
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  checkUserValidation(payload) {
    return this._httpClient
      .post(this.commonservice.rootURL + "/userValidation", payload, {
        observe: "body",
        responseType: "json",
      })
      .map((res) => res);
  }

  // getUserFormByID(formID) {
  //   return this.http
  //     .get(
  //       this.commonservice.rootURL +
  //         "/users/forms/" +
  //         formID +
  //         "?access_token=" +
  //         this.access_token
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  getUser() {
    return this._httpClient
      .get(`${this.commonservice.rootURL}/users`)
      .map((res: HttpResponse<any>) => res)
      .catch(this.errorHandler);
  }

  // getUserHeirarchy() {
  //   return this.http
  //     .get(
  //       this.commonservice.rootURL +
  //         "/users/data/all?access_token=" +
  //         this.access_token
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  getUserbyID(UserID) {
    return this._httpClient
      .get(`${this.commonservice.rootURL}/users/${UserID}`, {
        observe: "body",
        responseType: "json",
      })
      .map((res) => res)
      .catch(this.errorHandler);
  }
  // createUser(userDetails) {
  //   return this.http
  //     .post(
  //       this.commonservice.rootURL + `/users?access_token=` + this.access_token,
  //       userDetails
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  // editUserDetailsService(userDetails, userId) {
  //   //alert(JSON.stringify(this.commonservice.rootURL+'/users/'+userId+'?access_token='+this.access_token))
  //   return this.http
  //     .put(
  //       this.commonservice.rootURL +
  //         "/users/" +
  //         userId +
  //         "?access_token=" +
  //         this.access_token,
  //       userDetails
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  // deleteUser(deleteUserID) {
  //   return this.http
  //     .delete(
  //       this.commonservice.rootURL +
  //         `/users/` +
  //         deleteUserID +
  //         "?access_token=" +
  //         this.access_token
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  // attachDetachRoles(userId, roleDetails) {
  //   ////alert(this.commonservice.rootURL+'/users/'+userId+'/roles?access_token='+this.access_token);
  //   return this.http
  //     .put(
  //       this.commonservice.rootURL +
  //         "/users/" +
  //         userId +
  //         "/roles?access_token=" +
  //         this.access_token,
  //       roleDetails
  //     )
  //     .map((res: Response) => {
  //       ////lert(res.status);

  //       return res.json();
  //     })
  //     .catch(this.errorHandler);
  // }
  // attachDetachGroups(userId, roleDetails) {
  //   //alert(this.commonservice.rootURL+'/users/'+userId+'/groups?access_token='+this.access_token);
  //   return this.http
  //     .put(
  //       this.commonservice.rootURL +
  //         "/users/" +
  //         userId +
  //         "/groups?access_token=" +
  //         this.access_token,
  //       roleDetails
  //     )
  //     .map((res: Response) => {
  //       ////lert(res.status);

  //       return res.json();
  //     })
  //     .catch(this.errorHandler);
  // }
  // attachDetachRolesGet(userId) {
  //   return this.http
  //     .get(
  //       this.commonservice.rootURL +
  //         "/users/" +
  //         userId +
  //         "/roles?access_token=" +
  //         this.access_token
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  // attachDetachGroupsGet(userId) {
  //   return this.http
  //     .get(
  //       this.commonservice.rootURL +
  //         "/users/" +
  //         userId +
  //         "/groups?access_token=" +
  //         this.access_token
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  // getLinkedBranches(userID) {
  //   return this.http
  //     .get(
  //       this.branchesService.branchPort() +
  //         "/provideLinkedUserToBranch/" +
  //         userID +
  //         "?access_token=" +
  //         this.access_token
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  // updateLinkUserToBranch(userId, branchesLinked) {
  //   //alert(JSON.stringify(this.commonservice.rootURL+'/users/'+userId+'?access_token='+this.access_token))
  //   return this.http
  //     .put(
  //       this.branchesService.branchPort() +
  //         "/updateLinkUserToBranch/" +
  //         userId +
  //         "?access_token=" +
  //         this.access_token,
  //       branchesLinked
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  // editUserForm(userDetails, userFormTemplateID) {
  //   return this.http
  //     .put(
  //       this.commonservice.rootURL +
  //         "/users/forms/" +
  //         userFormTemplateID +
  //         "?access_token=" +
  //         this.access_token,
  //       userDetails
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  // createUserForms(userForms) {
  //   //alert(userForms);
  //   return this.http
  //     .post(
  //       this.commonservice.rootURL +
  //         `/users/forms?access_token=` +
  //         this.access_token,
  //       userForms
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  // createUserHierarchy(userID, payload) {
  //   //alert(userForms);
  //   return this.http
  //     .post(
  //       this.commonservice.rootURL +
  //         "/saveuserbyuserhirarchy/" +
  //         userID +
  //         "?access_token=" +
  //         this.access_token,
  //       payload
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  // getRootUserByID(UserID) {
  //   return this.http
  //     .get(
  //       this.commonservice.rootURL +
  //         "/users/root/" +
  //         UserID +
  //         "?access_token=" +
  //         this.access_token
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  // getRootUser() {
  //   return this.http
  //     .get(
  //       this.commonservice.rootURL +
  //         "/users/root?access_token=" +
  //         this.access_token
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  // OauthDetails() {
  //   return this.http
  //     .get(
  //       this.commonservice.rootURL +
  //         `/oauthDetails/` +
  //         "?access_token=" +
  //         this.access_token
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  // provideRootUserVisibility(UserID) {
  //   return this.http
  //     .get(
  //       this.commonservice.rootURL +
  //         "/users/root/" +
  //         UserID +
  //         "/visibility?access_token=" +
  //         this.access_token
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  // editRootUserDetailsVisibility(userId, visibility) {
  //   return this.http
  //     .put(
  //       this.commonservice.rootURL +
  //         "/users/root/" +
  //         userId +
  //         "/visibility/" +
  //         visibility +
  //         "?access_token=" +
  //         this.access_token,
  //       visibility
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  // editRootUserDetails(userId, data) {
  //   return this.http
  //     .put(
  //       this.commonservice.rootURL +
  //         "/users/root/" +
  //         userId +
  //         "?access_token=" +
  //         this.access_token,
  //       data
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  // getRootconfig(id) {
  //   return this.http
  //     .get(
  //       this.commonservice.rootURL +
  //         "/users/root/" +
  //         id +
  //         "/config?access_token=" +
  //         this.access_token
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  // getuserconfig(id) {
  //   return this.http
  //     .get(
  //       this.commonservice.rootURL +
  //         "/users/" +
  //         id +
  //         "/config?access_token=" +
  //         this.access_token
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  // editRootUserConfig(id, data) {
  //   return this.http
  //     .put(
  //       this.commonservice.rootURL +
  //         "/users/root/" +
  //         id +
  //         "/configs?access_token=" +
  //         this.access_token,
  //       data
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  // editUserConfig(id, data) {
  //   return this.http
  //     .put(
  //       this.commonservice.rootURL +
  //         "/users/" +
  //         id +
  //         "/config?access_token=" +
  //         this.access_token,
  //       data
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }
  errorHandler(error) {
    //

    let errorMessage = JSON.parse(error._body);

    if (errorMessage.message) {
      Swal.fire({
        title: "Sorry!",
        text: errorMessage.message,
        icon: "warning",
      });
      // //
      // window.open('/','_self');
    } else {
      if (error.status == 400) {
        alert(
          "The request could not be understood by the server due to malformed syntax"
        );
      } else {
        // window.open('/','_self');
      }
    }
    //import {Observable} from 'rxjs/Observable';
    return Observable.throw(error || " server error ");
  }
}
