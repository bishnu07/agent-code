import { Injectable } from "@angular/core";
import { AppService } from "../app.service";
import Swal from "sweetalert2";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
// import { BranchesService } from "app/branches/branches.service";
// import { PortFolioService } from "app/portFolio/portFolio.service";
import { debounce } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from "@angular/common/http";
import { LoginService } from "app/shared/services/login.service";
import { PortFolioService } from "app/shared/services/portFolio.service";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  public profileId: any;
  public profileFormId: any;
  public branches: any;
  public profileFormData: any;
  public access_token: string;
  public baseUrl: string;
  public treeLevel;
  public baseLink: string;

  public profileBaseUrl: string;

  private responseFormat = {
    observe: "body",
    responseType: "json",
  };

  constructor(
    private httpClient: HttpClient,
    private commonservice: AppService,
    private portfolioService: PortFolioService,
    private loginService: LoginService // private branchService: BranchesService
  ) {
    this.baseUrl =
      this.loginService.urlNumber() +
      ":" +
      this.loginService.portnumber() +
      "/ProfileService";
    this.access_token = loginService.access_tokenMethod();
    this.baseLink = this.profilePort();
  }

  profilePort() {
    return (this.profileBaseUrl =
      this.loginService.urlNumber() +
      ":" +
      this.loginService.portnumber() +
      "/ProfileService");
  }

  provideProfilePagination(pgNum, records) {
    // return this._http
    //   .get(`${this.profilePort()}/profiles`?pageNumber=" +pgNum +"&numberOfRecords=" +records,      )
    //   .map((response) => response)
    //   .catch(this.errorHandler);
    let params = new HttpParams()
      .set("pageNumber", pgNum)
      .set("numberOfRecords", records);
    return this.httpClient
      .get(`${this.profilePort()}/profiles`, {
        observe: "body",
        responseType: "json",
        params,
      })
      .map((response) => response)
      .catch(this.errorHandler);
  }

  provideProfileFormByProfileId(profileID) {
    console.log(profileID);
    let params = new HttpParams().set("formId", profileID);

    return this.httpClient
      .get(`${this.profilePort()}/profiles/forms`, {
        observe: "body",
        responseType: "json",
        params,
      })
      .map((res) => {
        return res;
      });

    // return this.httpClient.get(this.profilePort() + "/profiles/forms?access_token=" + this.access_token + (profileID ? '&formId=' + profileID : ''), this.options).map((res: Response) => { return res.json() });
  }

  provideProfileForms() {
    return this.httpClient
      .get(`${this.profilePort()}/profiles/forms`, {
        observe: "body",
        responseType: "json",
      })
      .map((res) => {
        return res;
      });

    // return this.httpClient.get(this.profilePort() + "/profiles/forms?access_token=" + this.access_token + (profileID ? '&formId=' + profileID : ''), this.options).map((res: Response) => { return res.json() });
  }

  provideProfileById(ProfileID) {
    return this.httpClient
      .get(`${this.profilePort()}/profiles/${ProfileID}`, {
        observe: "body",
        responseType: "json",
      })
      .map((response) => response)
      .catch(this.errorHandler);
  }

  filterProfilesWithPagination(filterData, pgNo, noOfRecords) {
    let params = new HttpParams();

    if (filterData.Identifier) {
      params = params.set("identifier", filterData.Identifier);
    }

    if (filterData.Hierarchy) {
      params = params.set("Hierarchy", filterData.Hierarchy);
    }

    if (filterData.Name) {
      params = params.set("name", filterData.Name);
    }

    if (filterData.NationalID) {
      params = params.set("nationalId", filterData.NationalID);
    }

    if (filterData.mobileNumber) {
      params = params.set("mobileNumber", filterData.mobileNumber);
    }

    params = params.set("pageNumber", 0);
    params = params.set("numberOfRecords", noOfRecords ?? 10);

    return this.httpClient
      .get(`${this.profilePort()}/searchProfiles`, { params })
      .map((response) => response)
      .catch(this.errorHandler);
  }

  updateProfile(selectProfile, ProfileID) {
    return this.httpClient
      .put(`${this.profilePort()}/profiles/${ProfileID}`, selectProfile, {
        observe: "body",
        responseType: "json",
      })
      .map((res) => res)
      .catch(this.errorHandler);
  }

  provideProfileFormById(profileFormId) {
    return this.httpClient
      .get(`${this.profilePort()}/profiles/forms/${profileFormId}`, {
        observe: "body",
        responseType: "json",
      })
      .map((response) => {
        return response;
      })
      .catch(this.errorHandler);
  }

  ProviceStateByCountryID(countryID) {
    return this.httpClient
      .get(`${this.profilePort()}/state/${countryID}`, {
        observe: "body",
        responseType: "json",
      })
      .map((response) => response)
      .catch(this.errorHandler);
  }

  ProviceCityByStateID(stateID) {
    return this.httpClient
      .get(`${this.profilePort()}/city/${stateID}`, {
        observe: "body",
        responseType: "json",
      })
      .map((response) => response)
      .catch(this.errorHandler);
  }

  getFileList(profID, type) {
    return this.httpClient
      .get(`${this.baseUrl}/files/${profID}/${type}`, {
        observe: "body",
        responseType: "json",
      })
      .map((response) => response);
  }

  updateProfileAsw(profileDetails, profID) {
    return this.httpClient
      .put(
        `${this.loginService.PROFILE_URL}/profiles/${profID}`,
        profileDetails
      )
      .map((res) => res)
      .catch(this.errorHandler);
  }

  provideProfileFormByFormID(profileID) {
    return this.httpClient
      .get(`${this.profilePort()}/profiles/forms/${profileID}`)
      .map((res: HttpResponse<any>) => res);
  }

  deleteProfile(profileId) {
    // return this._http
    //   .delete(
    //     this.profilePort() +
    //       "/profiles/" +
    //       profileId +
    //       "?access_token=" +
    //       this.access_token,
    //     this.options
    //   )
    //   .map((response: Response) => response.json())
    //   .catch(this.errorHandler);
  }

  createProfile(selectProfile) {
    return this.httpClient
      .post(`${this.profilePort()}/profiles`, selectProfile, {
        observe: "body",
        responseType: "json",
      })
      .map((res) => res)
      .catch(this.errorHandler);
  }

  searchBranchName(branchName = "") {
    let params = new HttpParams().set("branchName", branchName);
    return this.httpClient
      .get(
        `${this.loginService.urlNumber()}:${this.loginService.portnumber()}/PortfolioService/hierarchySearch`,
        {
          observe: "body",
          responseType: "json",
          params,
        }
      )
      .map((response) => response)
      .catch(this.errorHandler);
  }

  // provideProfilePagination(pgNum, records) {
  //   const headers = new HttpHeaders({ 'content-type': 'application/json' }).set('X-XSRF-TOKEN','adsss').set('Accept','application/json')
  //   const options = { headers: headers}
  //   return this.httpClient.get(this.profilePort() + "/profiles?pageNumber=" + pgNum + "&numberOfRecords=" + records + "&access_token=" + this.access_token, { headers: headers, observe: 'response' }).map((response) => response)
  //     .catch(this.errorHandler);
  // }

  ////////////// ------

  // createProfileform(selectProfileForm) {
  //   return this._http
  //     .post(
  //       this.profilePort() +
  //         "/profiles/forms?access_token=" +
  //         this.access_token,
  //       selectProfileForm,
  //       this.options
  //     )
  //     .map((res: Response) => res.json());
  // }

  // provideLinkMenuToRole(roleId) {
  //   return this._http
  //     .get(
  //       this.commonservice.menuURL +
  //         "/provideLinkMenuToRole?access_token=" +
  //         this.access_token +
  //         (roleId ? "&roleId=" + roleId : "&roleId="),
  //       this.options
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  // provideSelectedMenu(roleId) {
  //   return this._http
  //     .get(
  //       this.commonservice.menuURL +
  //         "/provideSelectedMenu?access_token=" +
  //         this.access_token +
  //         (roleId ? "&roleId=" + roleId : "&roleId="),
  //       this.options
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  // provideUserRolesByUser(userID) {
  //   return this._http
  //     .get(
  //       this.commonservice.roleURL +
  //         "/users/" +
  //         userID +
  //         "/roles?access_token=" +
  //         this.access_token,
  //       this.options
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  getLogo() {
    return this.httpClient
      .get(
        `${this.profilePort()}/logos/${this.loginService.rootUserID}/personal`,
        { observe: "body", responseType: "json" }
      )
      .map((res) => res);
  }

  // deleteLogo(fileName, rootUserID) {
  //   return this._http
  //     .delete(
  //       this.profilePort() +
  //         "/deleteLogo/" +
  //         this.loginService.rootUserID +
  //         "/personal/" +
  //         fileName +
  //         "?access_token=" +
  //         this.access_token
  //     )
  //     .map((res: Response) => res.json());
  // }

  // addLogo(formData, rootUserID) {
  //   return this._http
  //     .post(
  //       this.profilePort() +
  //         "/upload/logo/" +
  //         this.loginService.rootUserID +
  //         "/personal?access_token=" +
  //         this.access_token,
  //       formData
  //     )
  //     .map((res: Response) => res.json());
  // }

  addProductTemplateFile(productId, frmData) {
    const params = new HttpParams().set("productId", productId);
    return this.httpClient
      .post(`${this.profilePort()}/upload/productTemplate`, frmData, {
        observe: "body",
        responseType: "json",
      })
      .map((res) => {
        return res;
      });
  }

  getProductTemplateFile(productId) {
    return this.httpClient
      .get(`${this.profilePort()}/product/${productId}`, {
        observe: "body",
        responseType: "json",
      })
      .map((res) => {
        return res;
      });
  }

  // filterProfiles(filterData) {
  //   return this._http
  //     .get(
  //       this.profilePort() +
  //         "/searchProfiles?" +
  //         (filterData.Branch ? "&branchId=" + filterData.Branch + "&" : "") +
  //         (filterData.Identifier
  //           ? "&identifier=" + filterData.Identifier
  //           : "") +
  //         (filterData.Hierarchy ? "&Hierarchy=" + filterData.Hierarchy : "") +
  //         (filterData.Name ? "&name=" + filterData.Name : "") +
  //         (filterData.profileID ? "&profileId=" + filterData.profileID : "") +
  //         (filterData.linkedProfileID
  //           ? "&linkedProfileId=" + filterData.linkedProfileID
  //           : "") +
  //         (filterData.NationalID
  //           ? "&nationalId=" + filterData.NationalID
  //           : "") +
  //         "&access_token=" +
  //         this.access_token,
  //       this.options
  //     )
  //     .map((response: Response) => response.json())
  //     .catch(this.errorHandler);
  // }

  // provideProfile() {
  //   return this._http
  //     .get(
  //       this.profilePort() + "/profiles?access_token=" + this.access_token,
  //       this.options
  //     )
  //     .map((response: Response) => response.json())
  //     .catch(this.errorHandler);
  // }

  // updateProfileForm(selectProfileForm, profileFormId) {
  //   return this._http
  //     .put(
  //       this.profilePort() +
  //         "/profiles/forms/" +
  //         profileFormId +
  //         "?access_token=" +
  //         this.access_token,
  //       selectProfileForm,
  //       this.options
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  // deleteProfileForm(profileFormId) {
  //   return this._http
  //     .delete(
  //       this.profilePort() +
  //         "/profiles/forms/" +
  //         profileFormId +
  //         "?access_token=" +
  //         this.access_token,
  //       this.options
  //     )
  //     .map((response: Response) => response.json())
  //     .catch(this.errorHandler);
  // }

  // provideAllCountry() {
  //   return this._http
  //     .get(
  //       this.profilePort() + "/country?access_token=" + this.access_token,
  //       this.options
  //     )
  //     .map((response: Response) => response.json())
  //     .catch(this.errorHandler);
  // }

  // getBranches(branchLevel) {
  //   return this._http
  //     .get(
  //       this.branchService.branchPort() +
  //         "/getBranchByBranchLevel/" +
  //         branchLevel +
  //         "?access_token=" +
  //         this.access_token,
  //       this.options
  //     )
  //     .map((response: Response) => response.json())
  //     .catch(this.errorHandler);
  // }
  // getAllBranches() {
  //   return this._http
  //     .get(
  //       this.profilePort() +
  //         "/branches/hierarchy?access_token=" +
  //         this.access_token,
  //       this.options
  //     )
  //     .map((response: Response) => response.json())
  //     .catch(this.errorHandler);
  // }

  getAllBranchNames() {
    return this.httpClient
      .get(`${this.portfolioService.portfolioport()}/hierarchySearch`, {
        observe: "body",
        responseType: "json",
      })
      .map((response) => response)
      .catch(this.errorHandler);
  }

  getAllBranches(branchid) {
    const params = new HttpParams().set("branchid", branchid);
    return this.httpClient
      .get(`${this.profilePort()} +"/branches/hierarchy`, {
        observe: "body",
        responseType: "json",
        params,
      })
      .map((response) => response)
      .catch(this.errorHandler);
  }

  getProducts() {
    const params = new HttpParams().set("productID", "");

    return this.httpClient
      .get(`${this.loginService.PRODUCT_URL}/products`, {
        observe: "body",
        responseType: "json",
        params,
      })
      .map((res) => res["data"]);
  }

  // getBranchGroup(branchID) {
  //   return this._http
  //     .get(
  //       this.profilePort() +
  //         "/getTreeLevelBranchByBranchId/" +
  //         branchID +
  //         "?access_token=" +
  //         this.access_token,
  //       this.options
  //     )
  //     .map((response: Response) => response.json())
  //     .catch(this.errorHandler);
  // }

  // getBranchByID(branchID) {
  //   return this._http
  //     .get(
  //       this.profilePort() +
  //         "/provideBranch/" +
  //         branchID +
  //         "?access_token=" +
  //         this.access_token
  //     )
  //     .map((response: Response) => response.json())
  //     .catch(this.errorHandler);
  // }

  // getBranchesTree() {
  //   return this._http
  //     .get(
  //       this.branchService.branchPort() +
  //         "/branches/treeLevel?access_token=" +
  //         this.access_token,
  //       this.options
  //     )
  //     .map((response: Response) => response.json())
  //     .catch(this.errorHandler);
  // }

  // getAllBranchesTree() {
  //   return this._http
  //     .get(
  //       this.branchService.branchPort() +
  //         "/getAllTreeLevelBranches?access_token=" +
  //         this.access_token,
  //       this.options
  //     )
  //     .map((response: Response) => response.json())
  //     .catch(this.errorHandler);
  // }

  // searchApprovalProfiles(profileids, approved) {
  //   return this._http
  //     .get(
  //       this.profilePort() +
  //         "/searchapprovalProfiles?profileIds=" +
  //         profileids +
  //         "&access_token=" +
  //         this.access_token +
  //         (approved ? "&approved=" + approved : "&approved=")
  //     )
  //     .map((response: Response) => response.json())
  //     .catch(this.errorHandler);
  // }

  // getTreeHIerarchy() {
  //   return this._http
  //     .get(
  //       this.profilePort() +
  //         "/branches/treeHierarchy?access_token=" +
  //         this.access_token
  //     )
  //     .map((response: Response) => response.json())
  //     .catch(this.errorHandler);
  // }

  // getProfiles() {
  //   return this._http
  //     .get(
  //       this.profilePort() + "/profiles?access_token=" + this.access_token,
  //       this.options
  //     )
  //     .map((response: Response) => response.json())
  //     .catch(this.errorHandler);
  // }

  uploadFilesToProfile(pID, type, value) {
    // return this._http
    //   .post(this.baseUrl +
    //       "/upload/files/" +
    //       pID +
    //       "/" +
    //       type +
    //       "?access_token=" +
    //       this.access_token,
    //     value
    //   )
    //   .map((res: Response) => res.json())
    //   .catch(this.errorHandler);
    const headers = new HttpHeaders();
    headers.append("Accept", "multipart/form-data");

    return this.httpClient
      .post(`${this.baseUrl}/upload/files/${pID}/${type}`, value, { headers })
      .map((res) => res)
      .catch(this.errorHandler);
  }

  // editWorkflowPicture(picture, workflowId) {
  //   return this._http
  //     .post(
  //       this.baseUrl +
  //         "/upload/workflowPicture/" +
  //         workflowId +
  //         "?access_token=" +
  //         this.access_token,
  //       picture
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  // getFile(profID, type, fileName) {
  //   return this._http
  //     .get(
  //       this.baseUrl +
  //         "/downloadFile/" +
  //         profID +
  //         "/" +
  //         type +
  //         "/" +
  //         fileName +
  //         "?access_token=" +
  //         this.access_token
  //     )
  //     .map((response: Response) => response.json())
  //     .catch(this.errorHandler);
  // }

  // createProfileAsw(selectProfile) {
  //   return this._http
  //     .post(
  //       this.loginService.PROFILE_URL +
  //         "/profiles?access_token=" +
  //         this.loginService.access_token,
  //       selectProfile
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  // addLinkedProfileToProfile(profID, linkedProfID) {
  //   return this._http
  //     .put(
  //       this.profilePort() +
  //         "/profile/" +
  //         profID +
  //         "/linkedProfile/" +
  //         linkedProfID +
  //         "?access_token=" +
  //         this.access_token,
  //       this.options
  //     )
  //     .map((res: Response) => res.json())
  //     .catch(this.errorHandler);
  // }

  errorHandler(error) {
    let errorMessage = JSON.parse(error._body);
    if (
      errorMessage.message == "Access is Denied" ||
      errorMessage.message == "Access is denied"
    ) {
      Swal.fire({
        title: `<h3 class="swal-msg-font swal-title-font">Sorry!</h3>`,
        html: `<h5 class="swal-msg-font swal-text-font">${errorMessage.message}</h5>`,
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: false,
        focusConfirm: true,
        icon: "error",
      });
    } else if (errorMessage.status !== 400) {
      Swal.fire({
        title: `<h3 class="swal-msg-font swal-title-font">Sorry!</h3>`,
        html: `<h5 class="swal-msg-font swal-text-font">${errorMessage.message}</h5>`,
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: false,
        focusConfirm: true,
        icon: "error",
      });
    }
    return Observable.throw(error || " server error ");
  }
}
