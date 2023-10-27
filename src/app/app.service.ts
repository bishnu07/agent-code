import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { environment } from "../environments/environment";

// ng build --prod --aot false --build-optimizer false
// ng build --prod --aot true --build-optimizer true
// ng serve --port 4444 --watch=false

@Injectable({
  providedIn: "root",
})
export class AppService {
  /**
   * Default app theme color
   */
  themeColor: string = "#4ABDAC";
  public userDetails: any;

  /**
   * Every time we create a profle through MFF application.
   * it will be created with profile FormID 1 in solitx.
   */
  public formID: string = "1";
  public soltixURL = environment.soltixURL;
  public mffURL = environment.mffURL;
  public protocol = environment.protocol;
  public rootUser = environment.rootUser;

  public verifyPhone = this.mffURL + ":5055/LoginService";
  public thirdpartyurl = this.mffURL + ":5055/ThirdpartyService";
  public verifyAadharUrl =
    this.mffURL + ":5055/ThirdpartyService/okyc/otp/request";
  public verifyAadharOTP =
    this.mffURL + ":5055/ThirdpartyService/okyc/otp/verify";
  public eSignUrl = this.mffURL + ":5055/ThirdpartyService";
  public rootURL = this.mffURL + ":5055/UserService";
  public roleURL = this.mffURL + ":5055/UserService";
  public menuURL = this.mffURL + ":5055/UserService";
  public groupsURL = this.mffURL + ":5055/UserService";
  public loginURL = this.mffURL + ":5055/LoginService/login";
  public singupURL = this.mffURL + ":4008/mff/api";
  public collectionsURL = this.mffURL + ":6007/mff/sync/api";
  public approvalURL = this.mffURL + ":6061/mff/api";
  public portMFF = this.mffURL + ":6007/mff/sync/api";
  public portMFC = this.mffURL + ":6008/mfc/syc/api";
  public commonURL = this.mffURL + ":6003/mff/api";

  public validateURL = this.mffURL + ":5055/SolitxService";
  public branchesURL = this.mffURL + ":6003/mff/api/";
  public updateSummary = this.mffURL + ":7011/mff/api";

  // public verifyPhone = this.mffURL + ":4040/LoginService";
  // public thirdpartyurl = this.mffURL + ":4040/ThirdpartyService";
  // public verifyAadharUrl = this.mffURL + ":4040/ThirdpartyService/okyc/otp/request";
  // public verifyAadharOTP = this.mffURL + ":4040/ThirdpartyService/okyc/otp/verify";
  // public eSignUrl = this.mffURL + ":4040/ThirdpartyService";
  // public rootURL = this.mffURL + ":4040/UserService";
  // public roleURL = this.mffURL + ":4040/UserService";
  // public menuURL = this.mffURL + ":4040/UserService";
  // public groupsURL = this.mffURL + ":4040/UserService";
  // public loginURL = this.mffURL + ":4040/LoginService/login";
  // public singupURL = this.mffURL + ":4008/mff/api";
  // public collectionsURL = this.mffURL + ":6007/mff/sync/api";
  // public approvalURL = this.mffURL + ":6061/mff/api";
  // public portMFF = this.mffURL + ":6007/mff/sync/api";
  // public portMFC = this.mffURL + ":6008/mfc/syc/api";
  // public commonURL = this.mffURL + ":6003/mff/api"

  // public validateURL = this.mffURL + ":4040/SolitxService"
  // public branchesURL = this.mffURL + ":6003/mff/api/"
  // public updateSummary = this.mffURL + ":7011/mff/api"

  public colorTheme(): {} {
    return {
      color: this.themeColor,
    };
  }

  public bgTheme(): {} {
    return {
      "background-color": `${this.themeColor} !important;`,
    };
  }
}
