import {
  Component,
  OnInit,
  ElementRef,
  Type,
  ChangeDetectorRef,
  Input,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { ProfileService } from "../profile.service";
import { AppService } from "../../app.service";
import { DomSanitizer } from "@angular/platform-browser";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { Subject, Subscription, forkJoin } from "rxjs";
import { map, switchMap, take, tap } from "rxjs/operators";
import { AppComponent } from "app/app.component";
import { FileSizePipe } from "app/shared/pipes/filesize.pipe";
import { LoginService } from "app/shared/services/login.service";

import {
  debounceTime,
  delay,
  distinctUntilChanged,
  shareReplay,
  throttleTime,
} from "rxjs/operators";

/**
 * class to edit and update profile.
 */
@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
  private editProfile: any[] = [];
  public profiles: any;
  public profile = [];
  private profDetail: any;
  public profilelist = [];
  private selectProfile = [];
  private profileId: string;
  public fileSizeExceeded = false;
  public photoSizeExceeded = false;
  public showFileUpload = false;
  private formLabelValue: string;
  private invalidDate: boolean = false;
  private profPhoto: string;
  public filePreview: string;
  private imageFiles = {};
  public imgUrl: string;
  private item: any;
  private selectedItem: any;
  private AllowParentSelection = true;
  private RestructureWhenChildSameName = false;
  private ShowFilter = true;
  private Disabled = false;
  private FilterPlaceholder: string;
  private MaxDisplayed: number = 5;
  private documents = [];
  private dropDownColumns = [];
  private dropDownColumnsFull = [];
  private branchID: any;
  private showBranch: boolean = false;
  private today = new Date().toISOString().split("T")[0];
  private show: boolean = false;
  private pin_code: string;
  private showNationalID: boolean = false;
  private national_id: string;
  private hierarchyName: any;
  private mapOfBranch = new Map();
  private simpleSelected = {
    current_branch_id: "null",
  };
  private map = new Map();
  public defaultImageUrlPath: string = "/assets/img/user.png";
  public filePreviewAvailable = false;
  private countryCode: string = "";
  private filterChk: string = "";
  documentFile: any;
  progressProfilePicture: number;
  progress: number;
  private subscription: Subscription[] = [];
  documentFileSize: string;
  profileForm: any;
  profilePictureFileSize: string;

  searchTerm$ = new Subject<string>();
  onScrollSearch$ = new Subject<string>();

  countryISO2: string;

  searchResults = [];
  hierarchyData: { branchid: number; branch_name: string };

  @ViewChild("personalInput", { static: false }) personalInput: ElementRef;
  @ViewChild("profilePicInput", { static: false }) profilePicInput: ElementRef;

  /**
   * @constructor
   * @param {ProfileService} profileService - The profile service.
   * @param {Router} _router - The router service.
   * @param {NgbDateParserFormatter} ngbDateParserFormatter - NgbDateParserFormatter to format dates (yyyy-MM-dd).
   * @param {DomSanitizer} sanitizer - DomSanitizer helps preventing Cross Site Scripting Security bugs.
   * @param {AppService} appService - The app service.
   * @param {LoginService} loginService - THe login service.
   */
  constructor(
    public profileService: ProfileService,
    private modalService: NgbModal,
    private appComponent: AppComponent,
    private _router: Router,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    private sanitizer: DomSanitizer,
    private appService: AppService,
    private fileSize: FileSizePipe,
    private loginService: LoginService,
    private cdf: ChangeDetectorRef
  ) {
    this.searchTerm$
      .asObservable()
      .pipe(
        distinctUntilChanged(), // Ensure custom comparison
        debounceTime(500),
        switchMap((term) => {
          return this.profileService.searchBranchName(term).pipe(shareReplay());
        })
      )
      .subscribe(
        (results) => {
          this.searchResults = results?.["data"]["portfolio"] || [];
          this.cdf.detectChanges();
        },
        () => {}
      );

    this.onScrollSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((term) => {
          return this.profileService.searchBranchName(term);
        })
      )
      .subscribe(
        (results) => {
          this.searchResults = [
            ...this.searchResults,
            ...Array<string>(results["data"]["portfolio"]),
          ];
        },
        () => {}
      );
  }

  /**
   * Executed after constructor
   */
  ngOnInit() {
    this.showFileUpload = true;
    this.item = this.loginService.hierarchy;
    this.mapOfBranch = this.loginService.map;
    forkJoin(
      this.profileService.getFileList(
        this.profileService.profileId.profileID,
        "personal"
      ),
      this.profileService.provideProfileFormById(
        this.profileService.profileId.profileFormId
      ),
      this.profileService.provideProfileById(
        this.profileService.profileId.profileID
      ),
      this.profileService.provideProfileFormByProfileId(
        this.profileService.profileId.profileFormId
      )
    )
      .pipe(take(4))
      .subscribe(([res, data, users, profForm]) => {
        if (res) {
          if (res["data"]["documents"]) {
            this.documents = res["data"]["documents"].map(
              (file) => file.fileName
            );
          }
        }
        if (data) {
          let map = new Map();
          data["data"]["profileForm"]["profileFormDetails"][
            "Form Header"
          ].forEach((element) => {
            map.set(element["Label"], element["Value"]);
          });
          this.formLabelValue = map.get("Form Label");
          this.profilelist.push({
            formID: data["data"]["profileForm"]["profileFormID"],
            formlabel: this.formLabelValue,
          });
        }
        if (users) {
          this.profDetail = users["data"]["profiles"];
          this.profile = users["data"]["profiles"]["profileDetails"];
          this.countryCode = `${this.profile["Mobile Number"]}`.slice(1, 3);
          this.profile["Mobile Number"] =
            `${this.profile["Mobile Number"]}`.slice(3);
          this.profile["Hierarchy"]
            ? (this.branchID = this.profile["Hierarchy"])
            : "";
          this.profile["Hierarchy"]
            ? (this.simpleSelected.current_branch_id =
                this.profile["Hierarchy"])
            : "";
          this.profile["Hierarchy"]
            ? (this.hierarchyName = this.mapOfBranch.get(
                this.profile["Hierarchy"]
              ))
            : "";
          /**
           * Fetch profile picture.
           * if profile picture exist
           */
          if (this.profile["profilePicture"]) {
            this.filePreview = "";
            this.filePreviewAvailable = true;
            this.imgUrl =
              this.profile["profilePicture"] +
              "?access_token=" +
              this.profileService.access_token;
          }
          this.profPhoto = this.profile["Photo"];
          if (
            !this.profile["Age"] ||
            (this.profile["Date of Birth"] != "" && this.profile["Age"] == "")
          ) {
            this.profile["Age"] = this.getAge(this.profile["Date of Birth"]);
          }
          if (this.profile["Date of Birth"]) {
            let dob = { target: { value: "" } };
            dob["target"]["value"] = this.profile["Date of Birth"];
            this.dobChange(dob);
          }
        }
        if (profForm) {
          this.profileId = this.profileService.profileId.profileID;
          const profileData =
            profForm["data"]["profileForm"]["profileFormDetails"][
              "Form Header"
            ];
          profForm["data"]["profileForm"]["profileFormDetails"][
            "Form Body"
          ].forEach((element) => {
            profileData.push(element);
            if (element.Type == "Date") {
              this.profile[element["Label"]] = this.parse(
                this.profile[element["Label"]]
              );
            }
          });
          if (
            profileData.filter((profs) => profs.Type == "Branch").length == 0
          ) {
            this.profiles = profileData;
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
            this.profiles = profileData;
            this.cdf.detectChanges();
          }
        }
      });
  }

  onSearch(term: string) {
    this.searchTerm$.next(term); // Push the text value to the Subject
  }

  selectedBranch(event) {
    this.branchID = event?.branchid || "";
    this.hierarchyName = event?.branch_name || "";
  }

  scrollEvent(event) {
    console.log("event");
    this.onScrollSearch$.next(this.hierarchyName);
  }

  /**
   * To view image in full screen
   * @private
   */
  private viewImage(): void {
    this.appComponent.showImage = true;
    this.appComponent.fileName = this.profile.hasOwnProperty("profilePicture")
      ? this.profile["profilePicture"].substring(
          this.imgUrl.lastIndexOf("/") + 1
        )
      : "";
    this.appComponent.imageUrl = this.imgUrl;
    this.loginService.hideBodyScroll();
  }

  /**
   * To convert date(e.g DD-MM-YYYY) in to NgbDateStruct format
   * @param value
   * @private
   */
  private parse(value: string): NgbDateStruct {
    if (!value) return null;
    const parts = value.split("-");
    return {
      year: +parts[0],
      month: +parts[1],
      day: +parts[2],
    } as NgbDateStruct;
  }

  onCountryChange(event): void {
    console.log(event);
    this.countryISO2 = event.iso2;
    this.countryCode = event.dialCode;
  }

  telInputObject(event): void {
    console.log(event);
    event.setCountry(this.profile["ISO2"]);
    this.countryISO2 = event.s.iso2;
    this.countryCode = event.s.dialCode;
  }

  dobChange(event): void {
    const dateString = event.target.value;
    const myDate = new Date(dateString);
    const today = new Date();
    if (myDate > today) {
      this.invalidDate = true;
      this.profile["Age"] = 0;
    } else {
      this.invalidDate = false;
      this.profile["Age"] = this.getAge(event.target.value);
    }
  }

  /**
   * To validate DOB
   * @param dob
   * @private
   */
  private getAge(dob) {
    let age;
    if (dob) {
      const timeDiff = Math.abs(Date.now() - new Date(dob).getTime());
      age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      return age;
    } else return "";
  }
  /**
   * Handle file selection in a web application.
   * This method checks the selected file's extension and size, and updates related variables accordingly.
   *
   * @param {Event} event - The event object representing the file selection.
   * @param {string} label - Unused parameter.
   */
  selectFile(event, label) {
    let regex: RegExp = /[^\s]\.+(jpg|jpeg|png|pdf)$/i;
    if (regex.test(event.target.files[0].name)) {
      if (this.fileSize.getFileSize(event.target.files[0].size) < 501) {
        this.fileSizeExceeded = false;

        this.documentFileSize = this.fileSize.transform(
          event.target.files[0].size,
          "KB"
        );

        this.documentFile = event.target.files[0];
      } else {
        this.fileSizeExceeded = true;

        this.documentFileSize = "";
        this.documentFile = null;
      }
    } else {
      Swal.fire({
        title: "",
        text: "Upload only JPG, JPEG, PDF, and PNG files",
        icon: "error",
      });

      this.documentFileSize = "";
      this.documentFile = null;
    }
  }

  /**
   * Uploads a file of a specified type to the server, based on the provided `type` parameter.
   * This method checks if a file is available for upload and then calls the `uploadFile` method
   * to perform the actual upload operation.
   *
   * @param {string} type - The type of file to upload, typically "profilePicture" or another custom type.
   */
  upload(type) {
    if (type == "profilePicture") {
      if (!!this.profPhoto) {
        this.uploadFile(type, this.profPhoto, "profilePicture");
      }
    } else {
      if (!!this.documentFile) {
        this.uploadFile(type, this.documentFile, "personal");
      }
    }
  }

  /**
 
 * This method constructs a FormData object to prepare the file for upload, sends it to the server using
 * the profileService, and handles success and error responses.
 *
 * @param {string} type - The type of file being uploaded, such as "profilePicture or Other files".
 * @param {File} file - The File object representing the file to be uploaded.
 */
  uploadFile(type, file, options?: string) {
    const doc = new FormData();

    doc.append("files", file, file.name + "_" + new Date().toISOString());

    const uploadFile$ = this.profileService
      .uploadFilesToProfile(this.profileService.profileId.profileID, type, doc)
      .subscribe(
        (event) => {
          if (options === "personal") {
            this.documentFileSize = "";
            this.documentFile = null;
            this.personalInput.nativeElement.value = "";
          } else if (options === "profilePicture") {
            this.profilePictureFileSize = "";
            this.profPhoto = null;
            this.profilePicInput.nativeElement.value = "";

            this.profileService
              .provideProfileById(this.profileService.profileId.profileID)
              .subscribe((user) => {
                const checkProfile = user["data"]["profiles"]["profilePicture"];
                if (!!checkProfile) this.imgUrl = checkProfile;
                this.cdf.detectChanges();
              });
          }
          this.cdf.detectChanges();

          Swal.fire({
            title: `<h4 class="swal-msg-font swal-title-font">"Successfully Uploaded"</h4>`,
            html: "",
            showConfirmButton: false,
            timer: 2000,
            focusConfirm: true,
            icon: "success",
          });
        },
        (error) => {
          this.progress = null;
          this.progressProfilePicture = null;
        }
      );

    this.subscription.push(uploadFile$);
  }

  /**
   * To choose file
   * @param event
   * @private
   */
  selectPicture(event) {
    let regex: RegExp = /[^\s]\.+(jpg|jpeg|png)$/i;
    if (regex.test(event.target.files[0].name)) {
      this.filePreviewAvailable = false;

      if (this.fileSize.getFileSize(event.target.files[0].size) < 201) {
        this.profPhoto = event.target.files[0];

        this.photoSizeExceeded = false;

        this.profilePictureFileSize = this.fileSize.transform(
          event.target.files[0].size,
          "KB"
        );

        let reader = new FileReader();

        let file = event.target.files[0];

        reader.readAsDataURL(file);
        reader.onload = () => {
          this.filePreview =
            "data:image/png" +
            ";base64," +
            (reader.result as string).split(",")[1];
        };
      } else {
        this.photoSizeExceeded = true;

        this.profilePictureFileSize = "";
        this.profPhoto = null;
      }
    } else {
      Swal.fire({
        title: "",
        text: "Upload only JPG, JPEG and PNG files",
        icon: "error",
      });
      this.profPhoto = null;
      this.profilePictureFileSize = "";
    }
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
        }); //searchBranchName
      }
      this.filterChk == "" ? (this.filterChk = name) : "";
    } else {
      this.dropDownColumns = [];
    }
  }

  branchDeselect(item: any, item1: any): void {
    this.showBranch = false;
    this.branchID = item;
    this.hierarchyName = item1;
  }

  /**
   * To update profile
   * @param profileDetails - profile paylaod
   * @private
   */
  public onSubmit(profileDetails: any): void {
    this.branchID
      ? (profileDetails.Hierarchy = this.branchID)
      : (profileDetails.Hierarchy = "");
    profileDetails[
      "Mobile Number"
    ] = `+${this.countryCode}${profileDetails["Mobile Number"]}`;

    for (const key in this.profile) {
      if (!(key in profileDetails) && key != "Age") {
        profileDetails[key] = this.profile[key];
      } else if (key == "Age" && this.profile[key]) {
        profileDetails[key] = this.profile[key];
      }
    }

    this.profileId = this.profileService.profileId.profileID;
    /**
     * Changing date format
     */

    this.profiles.forEach((label) => {
      if (
        (label.Type == "Date" || label.Type == "date") &&
        profileDetails[label["Label"]] !== null
      ) {
        profileDetails[label["Label"]] = profileDetails[label["Label"]]
          ? new Date(
              this.ngbDateParserFormatter.format(profileDetails[label["Label"]])
            )
              .toISOString()
              .split("T")[0]
          : "";
      }
    });
    profileDetails["ISO2"] = this.countryISO2;
    profileDetails.hasOwnProperty("image") ? delete profileDetails.image : "";

    /**
     * To update profile
     */
    this.profileService
      .updateProfile(JSON.stringify(profileDetails), this.profileId)
      .subscribe(
        (data) => {
          setTimeout(() => {
            Swal.fire({
              title: `<h4 class="swal-msg-font swal-title-font">${
                (data as any).message
              }</h4>`,
              html: "",
              focusConfirm: true,
              timer: 1500,
              showConfirmButton: false,
              icon: "success",
            });
            this._router.navigate(["/client/list-of-clients"]);
          }, 500);
          if (
            this.profileService.profileId.linkedProfileID &&
            this.profileService.profileId.linkedProfileID != "null"
          ) {
            this.profileService
              .provideProfileById(this.profileId)
              .subscribe((users) => {
                let updateData = users["data"]["profiles"]["profileDetails"];
                delete updateData.profilePicture;
                delete updateData.FormID;
                updateData.FormID = this.appService.formID;

                /**
                 * Updating profile in solitx
                 */
                this.profileService
                  .updateProfileAsw(
                    updateData,
                    this.profileService.profileId.linkedProfileID
                  )
                  .subscribe((updateRes) => {}); //updateProfileAsw
              }); //provideProfileById
          }
          if (this.imageFiles) {
            for (var key in this.imageFiles) {
              if (key == "documents") {
                this.imageFiles[key].forEach((fileData) => {
                  const frmData = new FormData();
                  frmData.append("files", fileData);
                  this.profileService
                    .uploadFilesToProfile(
                      this.profileService.profileId.profileID,
                      "personal",
                      frmData
                    )
                    .subscribe();
                });
              } else {
                const frmData = new FormData();
                frmData.append(
                  "files",
                  this.imageFiles[key][0],
                  key + "_" + this.today
                );
                this.profileService
                  .uploadFilesToProfile(
                    this.profileService.profileId.profileID,
                    "personal",
                    frmData
                  )
                  .subscribe();
              }
            }
          }
          if (this.profPhoto) {
            const profPhotoData = new FormData();
            profPhotoData.append("files", this.profPhoto);
            this.profileService
              .uploadFilesToProfile(
                this.profileService.profileId.profileID,
                "profilePicture",
                profPhotoData
              )
              .subscribe();
          }
        },
        (error) => {}
      ); //updateProfile
  }

  private selectChangeHandler(event: any): void {
    this.selectProfile = event.target.value;
    this.profileService
      .provideProfileFormByProfileId(event.target.value)
      .subscribe((data) => {
        const profileData =
          data["data"]["profileForm"]["profileFormDetails"]["Form Body"];
        profileData.forEach((element1) => {
          if (element1.Type != "Branch") {
            this.editProfile.push(element1);
          }
        });
        this.editProfile.push(
          profileData.filter((prof) => prof.Type == "Branch")[0]
        );
      }); //provideProfileFormByProfileId
  }

  /**
   * To validate pincode
   * @param object
   * @private
   */
  private checkPincode(object): void {
    this.pin_code = object.target.value;
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
   * To validate national id
   * @param object
   * @private
   */
  private checkNationalId(object): void {
    this.national_id = object.target.value;
    if (
      object.target.value.length > Number(object.target.id) ||
      object.target.value.length < Number(object.target.id)
    ) {
      this.showNationalID = true;
    } else if (object.target.value.length == Number(object.target.id)) {
      this.showNationalID = false;
    }
  }

  /**
   * preventing Cross Site Scripting Security bugs.
   * @private
   */
  private sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  /**
   * To navigate to document storage module to see list of files
   * @private
   */
  viewDocs(): void {
    // this._router.navigate([
    //   "/DocumentStorage/DocumentStorageProfile/" +
    //     this.profileService.profileId.profileID,
    // ]);
  }

  warning(alert): void {
    Swal.fire({
      title: `<h4 class="swal-msg-font swal-title-font">Errors Found</h4>`,
      html: '<h5 class="swal-msg-font swal-text-font">Please correct errors and submit</h5>',
      // showCloseButton: true,
      showConfirmButton: false,
      focusConfirm: true,
      timer: 1500,
      confirmButtonText:
        '<span class="" [ngStyle]="appService.bgTheme()">Ok</span>',
      icon: "error",
    });
  }

  printMe(): void {
    const printContent = document.getElementById("invoice-template");
    const WindowPrt = window.open(
      "",
      "",
      "left=50px,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0"
    );
    WindowPrt.document.write(
      '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">'
    );
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    setTimeout(function () {
      WindowPrt.print();
    }, 1000);
  }
}
