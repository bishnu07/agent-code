import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { LoginService } from "../../shared/services/login.service";
import { AppService } from "../../app.service";
import { Observable } from "rxjs/Observable";
@Injectable()
export class RolesService {
  // add_header 'Access-Control-Allow-Origin' "$http_origin" always;
  // add_header 'Access-Control-Allow-Credentials' 'true' always;
  //add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
  public editRoleDetails: any;
  public access_token: any;
  private headers = new Headers({
    "content-type": "application/json",
    add_header: "Access-Control-Allow-Origin",
    $http_origin: "always",
  });
  private options = new RequestOptions({ headers: this.headers });
  constructor(
    private http: Http,
    private loginService: LoginService,
    private commonservice: AppService
  ) {
    this.access_token = loginService.access_tokenMethod();
  }

  getRoles() {
    return this.http
      .get(
        this.commonservice.roleURL + "/roles?access_token=" + this.access_token,
        this.options
      )
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }
  createRole(roleDetails) {
    //alert(JSON.stringify(this.commonservice.roleURL+'/roles?access_token='+this.access_token));
    return this.http
      .post(
        this.commonservice.roleURL +
          "/users/role?access_token=" +
          this.access_token,
        roleDetails
      )
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }
  editRoleDetailsService(roleDetails, rolId) {
    return this.http
      .put(
        this.commonservice.roleURL +
          "/roles/" +
          rolId +
          "/actions?access_token=" +
          this.access_token,
        roleDetails
      )
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }
  deleteRole(deleteRoleID) {
    ////alert(deleteUserID);
    return this.http
      .delete(
        this.commonservice.roleURL +
          "/roles/" +
          deleteRoleID +
          "?access_token=" +
          this.access_token,
        this.options
      )
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }
  getRole(roleID) {
    return this.http
      .get(
        this.commonservice.roleURL +
          "/roles/" +
          roleID +
          "?access_token=" +
          this.access_token,
        this.options
      )
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }
  provideUserRolesByUser(userID) {
    return this.http
      .get(
        this.commonservice.roleURL +
          "/users/" +
          userID +
          "/roles?access_token=" +
          this.access_token,
        this.options
      )
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }
  getActions() {
    return this.http
      .get(
        this.commonservice.roleURL +
          "/actions?access_token=" +
          this.access_token,
        this.options
      )
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }
  errorHandler(error: Response) {
    if (error.status == 401) {
      window.open("/", "_self");
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
