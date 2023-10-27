import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from "../profile.service";
import Swal from "sweetalert2";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { I18NService } from "app/I18NService/i18-n.service";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { LoginService } from "app/shared/services/login.service";

export interface GoogleTranslate {
  q: string[];
  target: any;
}

interface ParseDate {
  year: string;
  month: string;
  day: string;
}

/**
 * class to create profiles.
 */
@Component({
  selector: "app-create-profile",
  templateUrl: "./create-profile.component.html",
  styleUrls: ["./create-profile.component.scss"],
})
export class CreateProfileComponent implements OnInit {
  public branches: any[] = [];
  public invalidDate: boolean = false;
  public age: number;
  public fileSizeExceeded = false;
  public photoSizeExceeded = false;
  public showFileUpload = false;
  public profilelist: any[] = [];
  public Profileform: any[] = [];
  public provincesDetails = [];
  public city = [];
  public count = 0;
  public fileName: string;
  public filePreview: string;
  public imageFiles: any;
  public profPhoto: any;
  public country = [];
  public item: any;
  public selectedItem: any;
  public formLabelValue: any;
  public showBranch: boolean = false;
  public branchID: any;
  public branchName: any;
  public dropDownColumns = [];
  public dropDownColumnsFull = [];
  public pincodePattern: string = "^[0-9]{6}$";
  public pin_code: string;
  public show: boolean = false;
  public showNationalID: boolean = false;
  public national_id: string;
  public map = new Map();
  public translateObject: any;
  public countryCode: string = "";
  public filterChk: string = "";

  /**
   * @constructor
   * @param {ProfileService} profileService - The profile service
   * @param {I18NService} i18nService - The I18N service.
   * @param {Router} _router - The router service.
   * @param {DomSanitizer} sanitizer - DomSanitizer helps preventing Cross Site Scripting Security bugs.
   * @param {NgbDateParserFormatter} ngbDateParserFormatter - NgbDateParserFormatter to format dates (yyyy-MM-dd).
   * @param {LoginService} loginService - The login service.
   */
  constructor(
    private profileService: ProfileService,
    private i18nService: I18NService,
    private _router: Router,
    private sanitizer: DomSanitizer,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private cdf: ChangeDetectorRef
  ) {}

  /**
   * Executed after constructor
   */
  ngOnInit() {
    // this.i18nService.localEvent.subscribe(locale => { });
    this.item = this.loginService.hierarchy;

    /**
     * fetching all profile forms
     */
    this.profileService.provideProfileForms().subscribe((users) => {
      users["data"]["profileForms"].forEach((element) => {
        let profileData = element["profileFormDetails"];
        let map = new Map();
        profileData.forEach((element1) => {
          map.set(element1["Label"], element1["Value"]);
          this.formLabelValue = map.get("Form Label");
        });

        this.profilelist.push({
          formID: element["profileFormID"],
          formlabel: this.formLabelValue,
        });
      });
    }); //provideProfileFormByProfileId
  }

  /**
   * To convert date(e.g DD-MM-YYYY) in to NgbDateStruct format
   * @param value
   * @private
   */
  private parse(value: string): NgbDateStruct {
    if (!value) return null;
    let parts = value.split("-");
    return {
      year: +parts[0],
      month: +parts[1],
      day: +parts[2],
    } as NgbDateStruct;
  }

  /**
   * To convert  NgbDateStruct format into date(e.g DD-MM-YYYY)
   * @param value
   * @private
   */
  private parseDatePicker(dateObj: ParseDate): string {
    if (!dateObj) return null;
    let parts = `${dateObj.year}-${dateObj.month}-${dateObj.day}`;
    return parts;
  }

  onCountryChange(event) {
    this.countryCode = event.dialCode;
  }

  telInputObject(event) {
    this.countryCode = event.s.dialCode;
  }

  selectFiles(event) {
    this.fileSizeExceeded = false;
    this.imageFiles = [];
    for (let key in event.target.files) {
      if (key !== "length" && key !== "item") {
        if (event.target.files[key].size < 20000000) {
          this.imageFiles.push(event.target.files[key]);
        } else {
          this.fileSizeExceeded = true;
          Swal.fire({
            title: `<h4 class="swal-msg-font swal-title-font">File Size Exceeded</h4>`,
            html: '<h5 class="swal-msg-font swal-text-font">Please Upload Files Lesser Than 20MB</h5>',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1500,
            focusConfirm: true,
            icon: "error",
          });
        }
      }
    }
  }

  /**
   * To select image
   * @param event
   * @private
   */
  private selectProfPhoto(event) {
    this.photoSizeExceeded = false;
    if (event.target.files[0].size < 1000000) {
      this.profPhoto = event.target.files[0];
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileName = file.name + " " + file.type;
        this.filePreview =
          "data:image/png" +
          ";base64," +
          (reader.result as string).split(",")[1];
      };
    } else {
      this.photoSizeExceeded = true;
      Swal.fire({
        title: `<h4 class="swal-msg-font swal-title-font">File Size Exceeded</h4>`,
        html: '<h5 class="swal-msg-font swal-text-font">Please Upload Files Lesser Than 20MB</h5>',
        // showCloseButton: true,
        showConfirmButton: false,
        timer: 1500,
        focusConfirm: true,
        icon: "error",
      });
    }
  }

  /**
   * preventing Cross Site Scripting Security bugs.
   * @param url
   * @private
   */
  private sanitize(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  /**
   * To select profile form
   * @param event
   * @private
   */
  public selectChangeHandler(event: any): void {
    this.Profileform = [];
    console.log(event.target.value);
    this.profileService
      .provideProfileFormByProfileId(event.target.value)
      .subscribe((data) => {
        let profileData =
          data["data"]["profileForm"]["profileFormDetails"]["Form Header"];
        data["data"]["profileForm"]["profileFormDetails"]["Form Body"].forEach(
          (element) => {
            profileData.push(element);
          }
        );
        if (profileData.filter((profs) => profs.Type == "Branch").length == 0) {
          this.Profileform = profileData;
        } else {
          let branchForm = profileData.filter(
            (profs) => profs.Type == "Branch"
          )[0];
          profileData.splice(
            profileData.findIndex(function (i) {
              return i.Type === "Branch";
            }),
            1
          );
          profileData.push(branchForm);
          this.Profileform = profileData;
          console.log(this.Profileform);
          this.cdf.detectChanges();
          const google: GoogleTranslate = {
            q: this.translateObject,
            target: localStorage.getItem("lang") || "en",
          };
        }
        this.showFileUpload = true;
      });
  }

  checkCountryCode(ph) {}

  /**
   * To create profile
   * @param profileDetails - payload
   * @private
   */
  public onSubmit(profileDetails: any): void {
    let dataInArr = [];
    dataInArr.push(profileDetails);
    dataInArr.forEach(() => {
      if (this.count == 0) {
        this.count++;
        this.branchID
          ? (profileDetails.Hierarchy = this.branchID)
          : (profileDetails.Hierarchy = "");
        this.Profileform.forEach((label) => {
          if (
            (label.Type == "Date" || label.Type == "date") &&
            profileDetails[label["Label"]] !== null
          ) {
            profileDetails[label["Label"]] = profileDetails[label["Label"]]
              ? new Date(
                  this.ngbDateParserFormatter.format(
                    profileDetails[label["Label"]]
                  )
                )
                  .toISOString()
                  .split("T")[0]
              : "";
          }
        });

        /**
         * create profile
         */
        this.profileService
          .createProfile(JSON.stringify(profileDetails))
          .subscribe(
            (profileDetails) => {
              if (this.imageFiles) {
                const frmData = new FormData();
                this.imageFiles.forEach((fileData) => {
                  frmData.append("files", fileData);
                });
                this.profileService
                  .uploadFilesToProfile(
                    profileDetails["profileID"],
                    "personal",
                    frmData
                  )
                  .subscribe();
              }
              if (this.profPhoto) {
                const profPhotoData = new FormData();
                profPhotoData.append("files", this.profPhoto);
                this.profileService
                  .uploadFilesToProfile(
                    profileDetails["profileID"],
                    "profilePicture",
                    profPhotoData
                  )
                  .subscribe();
              }
              let msg = profileDetails["data"]["identifier"]
                ? profileDetails["data"]["identifier"]
                : "";
              if (msg != "") {
                setTimeout(() => {
                  Swal.fire({
                    title: `<h4 class="swal-msg-font swal-title-font">${profileDetails["message"]}</h4>`,
                    html: "",
                    // showCloseButton: true,
                    showConfirmButton: false,
                    timer: 1500,
                    focusConfirm: true,
                    icon: "success",
                  });
                  this._router.navigate(["../list-of-clients"], {
                    relativeTo: this.activatedRoute,
                  });
                }, 1000);
              } else if (msg == "") {
                Swal.fire({
                  title: `<h4 class="swal-msg-font swal-title-font">${profileDetails["message"]}</h4>`,
                  html: "",
                  // showCloseButton: true,
                  showConfirmButton: false,
                  timer: 1500,
                  focusConfirm: true,
                  confirmButtonText:
                    '<span class="" [ngStyle]="appService.bgTheme()">Ok</span>',
                  icon: "info",
                });

                this.count = 0;
              }
            },
            (error) => {
              this.count = 0;
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
              throw new Error(error || " server error ");
            }
          );
      }
    });
  }

  selectChangeHandlerState(event: any): void {
    this.profileService
      .ProviceCityByStateID(event.target.value)
      .subscribe((data) => {
        this.city = data as any;
      });
  }

  selectChangeHandlerCountry(event: any): void {
    this.profileService
      .ProviceStateByCountryID(event.target.value)
      .subscribe((data) => {
        this.provincesDetails = data as any;
      });
  }

  /**
   * To search branch
   * @param name
   * @private
   */
  private filterBranch(name): void {
    this.showBranch = true;
    name.length < 4 ? (this.filterChk = "") : "";
    if (name.length > 3) {
      if (
        this.filterChk != "" &&
        name.includes(this.filterChk) &&
        this.dropDownColumnsFull.length != 0
      ) {
        this.dropDownColumns = this.dropDownColumnsFull.filter((col) =>
          col.branch_name.toLowerCase().includes(name.toLowerCase())
        );
      } else {
        this.dropDownColumns = [];
        this.profileService.searchBranchName(name).subscribe((res) => {
          this.dropDownColumns = res["data"]["portfolio"];
          this.dropDownColumnsFull = res["data"]["portfolio"];
        });
      }
      this.filterChk == "" ? (this.filterChk = name) : "";
    } else {
      this.dropDownColumns = [];
    }
  }

  branchDeselect(item: any, item1: any): void {
    this.showBranch = false;
    this.branchID = item;
    this.branchName = item1;
  }

  dobChange(event): void {
    const dateString = event.target.value;
    const myDate = new Date(dateString);
    const today = new Date();
    if (myDate > today) {
      this.invalidDate = true;
      this.age = 0;
    } else {
      this.invalidDate = false;
      this.age = this.getAge(event.target.value);
    }
  }

  /**
   * To validate DOB
   * @param dob
   * @private
   */
  private getAge(dob): number {
    let age;
    if (dob) {
      const timeDiff = Math.abs(Date.now() - new Date(dob).getTime());
      age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      return age;
    } else return;
  }

  maxLengthCheck(object): void {
    if (object.target.value.length > Number(object.target.id))
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
  }

  /**
   * To validate pincode
   * @param object
   * @private
   */
  private checkPincode(object): void {
    if (
      object.target.value.length > Number(object.target.id) ||
      object.target.value.length < Number(object.target.id)
    ) {
      this.show = true;
    } else if (object.target.value.length == Number(object.target.id)) {
      this.show = false;
    }
  }

  /**
   * To validate national Id
   * @param object
   * @private
   */
  private checkNationalID(object): void {
    if (
      object.target.value.length > Number(object.target.id) ||
      object.target.value.length < Number(object.target.id)
    ) {
      this.showNationalID = true;
    } else if (object.target.value.length == Number(object.target.id)) {
      this.showNationalID = false;
    }
  }

  warning() {}
}
