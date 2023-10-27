import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";
import { LoginService } from "./login.service";
import { AppService } from "app/app.service";

@Injectable({
  providedIn: "root",
})
export class PortFolioService {
  public access_token: any;
  public portfolioUrl: any;

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService,
    private commonservice: AppService
  ) {
    this.access_token = loginService.access_tokenMethod();
  }

  portfolioport() {
    return (this.portfolioUrl =
      this.loginService.urlNumber() +
      ":" +
      this.loginService.portnumber() +
      "/PortfolioService");
  }

  /**
   * To catch error
   * @param error
   */
  errorHandler(error) {
    let errorMessage = JSON.parse(error._body);
    if (errorMessage.message) {
      Swal.fire({
        title: "Sorry!",
        text: errorMessage.message,
        icon: "warning",
      });
    }
    return Observable.throw(error || " server error ");
  }
}
