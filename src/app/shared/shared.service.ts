import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { AppService } from "../app.service";
import { Observable } from "rxjs/Observable";
import Swal from "sweetalert2";
import { ProfileService } from "app/profiles/profile.service";
import { HttpClient } from "@angular/common/http";
import { LoginService } from "./services/login.service";

@Injectable()
export class SharedService {
  public editUserDetails: any;
  public access_token: any;
  public editUserID: any;
  public userFormTamplateId: any;
  public access_token_asw: any;

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService,
    private commonservice: AppService
  ) {
    this.access_token = loginService.access_tokenMethod();

    this.access_token_asw = loginService.accessTokenAsw();
  }

  // changeRootUserPassword(passwordCreds) {
  //   return this.http
  //     .post(
  //       this.commonservice.rootURL +
  //         `/updateRootPassword?access_token=` +
  //         this.access_token,
  //       passwordCreds
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  // changeUserPassword(passwordCreds) {
  //   return this.http
  //     .post(
  //       this.commonservice.rootURL +
  //         `/changeUserPassword?access_token=` +
  //         this.access_token,
  //       passwordCreds
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  // provideChartOfAccountss() {
  //   return this.http
  //     .get(
  //       this.loginService.ACCOUNT_URL +
  //         "/accounting/coa?access_token=" +
  //         this.access_token
  //     )
  //     .map((response: Response) => response.json())
  //     .catch(this.errorHandler);
  // }

  getUserInfo() {
    return this.httpClient
      .get(`${this.commonservice.rootURL}/users/root`, {
        observe: "body",
        responseType: "json",
      })
      .map((res) => res);
  }

  getLogoUrl(url) {
    return this.httpClient
      .get(url, { headers: { Accept: "image/jpeg" }, responseType: "blob" })
      .map((res) => res);
  }

  errorHandler(error) {
    let errorMessage = JSON.parse(error._body);

    if (errorMessage.status == 400) {
      Swal.fire("Sorry!", errorMessage.message, "error");
    } else if (errorMessage.status == 404) {
      Swal.fire("Sorry!", errorMessage.message, "error");
    } else if (errorMessage.status == 401) {
      Swal.fire("Sorry!", errorMessage.message, "error");
    } else if (
      errorMessage.message == "Access is Denied" ||
      errorMessage.message == "Access is denied"
    ) {
      Swal.fire("Sorry!", errorMessage.message, "error");
    }

    return Observable.throw(error || " server error ");
  }
}
