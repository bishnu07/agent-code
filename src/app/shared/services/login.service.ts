import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams } from "@angular/common/http";
// import { Http, Response, Headers, RequestOptions } from "@angular/http";
import * as Chartist from "chartist";
import { ChartType, ChartEvent } from "ng-chartist";
import { Subject, BehaviorSubject } from "rxjs";
import { AppComponent } from "app/app.component";
import { NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { options } from "app/shared/data/dropdowns";
import { AppService } from "app/app.service";

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Injectable({
  providedIn: "root",
})
export class LoginService {
  public sidebarMenu = [];
  public listOfWorkflows = [];
  public userEvent = new Subject<any>();
  public stripePayment = new Subject<any>();
  public bulkReceiveEventIds = new Map();
  public authCount = 0;
  public editWorkflow = new Map<number, string>();
  modalOption: NgbModalOptions;
  public aadhaarDetails: any[] = [];
  public showLoader: boolean = false;
  public documentDetails: any;
  public profileData: any;
  public parData: any;
  public parCount = 0;
  public par: any;
  public DonutChart: Chart;
  public showHide: any;
  public contracts: any;
  public editUserDetails: any;
  public access_token: any;
  public access_token_asw: any;
  public username: string;
  public usernameAsw: any;
  public port: any;
  public url: any;
  public userId: any;
  public flag: any;
  public refresh_token: any;
  public token_validity: any;
  public user: any;
  public allBranchId: any;
  public hierarchy: any;
  public protocol = "https://";
  public map = new Map();
  public charOfAccName = [];
  public treeLevelBranches: any;
  public productsData = [];
  public usersData: any;
  public menu = [];
  public entityName;
  public pathName: any;
  public otp2FA: string;
  public loginUser = {};
  public enableSetting: boolean = false;
  public componentTourName: string;
  public deploylogsUrl: string =
    this.commonservice.soltixURL + "5050/ChainService/getDeployContracts";
  public stateUpdateUrl: string =
    this.commonservice.soltixURL + "8999/instrumentStateUpdate";

  public eventUrl: string =
    this.commonservice.soltixURL + "8999/contractEvents";

  public eventTermUrl: string =
    this.commonservice.soltixURL + "8999/terms/contractEvents";

  public SMART_CONTRACT_URL: string = `${this.commonservice.validateURL}/SmartContractService`;

  public END_OF_DAY_PROCESSING_URL: string = `${this.commonservice.validateURL}/EndOfDayProcessing`;

  public loadSummaryUrl = this.commonservice.mffURL + ":4009";
  public marketObjectUrl: string =
    this.commonservice.soltixURL + "5050/MarketsService";

  public MARKET_OBJECT_URL: string = `${this.commonservice.validateURL}/MarketsService`;

  public accountUrl = this.commonservice.soltixURL + "5050/AccountingService";

  public ACCOUNT_URL = `${this.commonservice.validateURL}/AccountingService`;

  public ProfileUrl = this.commonservice.soltixURL + "5050/ProfilesService";

  public PROFILE_URL = `${this.commonservice.validateURL}/ProfilesService`;

  public ProductURL = this.commonservice.soltixURL + "5050/ProductService";

  public PRODUCT_URL = `${this.commonservice.validateURL}/ProductService`;

  public paymentUrl =
    this.commonservice.mffURL + ":5055/SolitxService/PaymentServices";

  public PAYMENT_URL = `${this.commonservice.validateURL}/PaymentServices`;

  public contractURL = this.commonservice.soltixURL + "5050/ContractService";

  public CONTRACT_URL = `${this.commonservice.validateURL}/ContractService`;

  public casperURL = this.commonservice.soltixURL + "5050/ChainService";

  public CASPER_URL = `${this.commonservice.validateURL}/ChainService`;

  public eventsURL = this.commonservice.soltixURL + "5050/BusinessEventService";

  public BUSINESS_EVENT_URL = `${this.commonservice.validateURL}/BusinessEventService`;

  public loginURL = this.commonservice.soltixURL + "5050/oauth/token";

  public transctionURL =
    this.commonservice.soltixURL + "5050/TransactionsService";

  public TRANSACTION_URL = `${this.commonservice.validateURL}/TransactionsService`;

  public ledgerURL = this.commonservice.soltixURL + "5050/LedgerService";

  public LEDGER_URL = `${this.commonservice.validateURL}/LedgerService`;

  public rootURL = this.commonservice.soltixURL + "5050/UserService";
  public roleURL = this.commonservice.soltixURL + "5050/UserService";
  public groupsURL = this.commonservice.soltixURL + "5050/UserService";
  public rootURLDeals = this.commonservice.soltixURL + "5050/DealService";

  public singupURL = this.commonservice.soltixURL + "5050/UserService";
  public marketURL = this.commonservice.soltixURL + "5050/MarketsService";

  public MARKET_URL = `${this.commonservice.validateURL}/MarketsService`;

  // private headers = new Headers({
  //   "content-type": "application/json",
  //   add_header: "Access-Control-Allow-Origin",
  //   $http_origin: "always",
  // });

  stateNameMap = new Map();
  stateCodeMap = new Map();
  typeName = new Map();
  typeCode = new Map();
  relationName = new Map();
  relationCode = new Map();
  rootUserID;

  logoUrl: any;
  rootDetails;
  logoDetails = [];
  tokenExpireTime: number;
  clearToken;
  public loginProcessing: boolean = false;
  public logoutToast = new BehaviorSubject("");
  public key = "AIzaSyB_0SGp78gc4g8TW43OcwGcUthYvUnuqrU";
  entityFullname = "";
  public translateUrl =
    "https://translation.googleapis.com/language/translate/v2?key=" + this.key;
  public workflowsLoaded: boolean = false;
  profileDetail: any;
  constructor(
    // private http: Http,
    private commonservice: AppService,
    private httpClient: HttpClient,
    private appService: AppService
  ) {
    console.log("login.service");
    this.aadhaarDetails = [];
    this.modalOption = {
      backdrop: "static",
      keyboard: false,
    };
  }

  OauthDetails() {
    // let headers = new Headers();
    // headers.append("Content-Type", "application/json");
    // headers.append("Accept", "application/json");
    // headers.append(
    //   "Access-Control-Allow-Methods",
    //   "POST, GET, OPTIONS, DELETE, PUT"
    // );
    // headers.append("Access-Control-Allow-Origin", "*");
    // headers.append(
    //   "Access-Control-Allow-Headers",
    //   "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding"
    // );
    // let options = new RequestOptions({ headers: headers });
    return this.httpClient
      .get(`${this.commonservice.rootURL}/oauthDetails`, {
        observe: "body",
        responseType: "json",
      })
      .map((res) => res);
  }

  loginOAuth(username) {
    this.logoutToast.next("logOut");
    this.username = username;
    return this.httpClient
      .post(`${this.commonservice.loginURL}`, username, {
        observe: "body",
        responseType: "json",
      })
      .map((res: Response) => res.json());
  }

  // fetchListOfCards(filterData) {
  //   return this.http
  //     .get(
  //       this.appService.thirdpartyurl +
  //         "/cards?access_token=" +
  //         this.access_token +
  //         "&status=" +
  //         filterData.status
  //     )
  //     .map((response: Response) => response.json());
  // }

  triggerUserEvent(data: any) {
    this.userEvent.next(data);
  }

  stripePay(data: any) {
    this.stripePayment.next(data);
  }

  public access_tokenMethod() {
    return this.access_token;
  }

  public portnumber() {
    return this.port;
  }

  // checkPhoneNumber(loginDetails) {
  //   return this.http
  //     .get(
  //       this.commonservice.verifyPhone +
  //         "/verify/phoneNumber?phoneNumber=" +
  //         loginDetails.mobileNumber
  //     )
  //     .map((response: Response) => response.json());
  // }

  // getProductList() {
  //   return this.http
  //     .get(
  //       this.appService.validateURL +
  //         "/products?productID=&access_token=" +
  //         this.access_token
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  public urlNumber() {
    return this.commonservice.protocol + this.url;
  }

  changeTableTheme() {
    var title = document.querySelectorAll("ng2-st-column-title");
    var action = document.querySelectorAll("tbody");
    var buttons = document.querySelectorAll("button");
    var paginationButtons = document.querySelectorAll(".pagination");

    if (Array.from(title).length > 0) {
      Array.from(title).forEach((ele) => {
        ele.getElementsByTagName("a")[0].style.color =
          this.appService.themeColor;
        ele.getElementsByTagName("a")[0].classList.add("hoverEffect");
      });
    }

    if (Array.from(buttons).length > 0) {
      Array.from(buttons).forEach((ele) => {
        ele.style["background-color"] = this.appService.themeColor;
      });
    }

    if (Array.from(paginationButtons).length > 0) {
      Array.from(paginationButtons).forEach((ele) => {
        Array.from(ele.querySelectorAll("button")).forEach((page) => {
          page.style.color = "white";
        });
      });
    }
  }

  hideBodyScroll() {
    // $(document).ready(function () {
    //   $("body").addClass("hide_overflow");
    // });
  }

  autoBodyScroll() {
    // $(document).ready(function () {
    //   $("body").removeClass("hide_overflow");
    // });
  }

  public userIds() {
    return this.userId;
  }

  public flags() {
    return this.flag;
  }

  changeLang(locale) {
    return this.httpClient.get("../../assets/i18n/" + locale + ".json");
  }

  targetLang(url, translateObject) {
    return this.httpClient.post(url, translateObject);
  }

  registerForm() {
    return this.httpClient
      .get(`${this.commonservice.singupURL}/users/root/forms`, {
        observe: "body",
        responseType: "json",
      })
      .map((response) => response);
  }

  createRootUserProfile(profileData) {
    return this.httpClient
      .post(`${this.commonservice.singupURL}/users/root/forms`, profileData, {
        observe: "body",
        responseType: "json",
      })
      .map((res) => res);
  }

  loginAsw(username) {
    this.usernameAsw = username;
    return this.httpClient
      .post(this.loginURL, username, { observe: "body", responseType: "json" })
      .map((res) => {
        return res;
      })
      .catch(this.errorHandler);
  }

  loginOAuthAsw(username) {
    this.username = username;
    const headers = {
      Authorization: "Basic " + btoa("web-app:"),
      "Content-type": "application/x-www-form-urlencoded",
    };
    return this.httpClient.post(this.loginURL, username, { headers });
  }

  public accessTokenAsw() {
    return this.access_token_asw;
  }

  loginOAuthRefresh() {
    return this.httpClient
      .post(
        this.loginURL,
        { refresh_token: this.refresh_token },
        { observe: "body", responseType: "json" }
      )
      .map((res) => {
        return res;
      })
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    if (error.status == 500) {
      this.loginProcessing = false;
      alert("Invalid RootUser/UserName/Password");
    }
    return Observable.throw(error || " server error ");
  }
}
