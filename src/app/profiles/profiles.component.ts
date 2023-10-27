import {
  Component,
  OnInit,
  Renderer2,
  ChangeDetectorRef,
  AfterViewInit,
  NgZone,
  ChangeDetectionStrategy,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from "./profile.service";
import { AppComponent } from "../app.component";
import Swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";
import { I18NService } from "app/I18NService/i18-n.service";
import { LoginService } from "app/shared/services/login.service";

import { NgbDropdown } from "@ng-bootstrap/ng-bootstrap";
export interface GoogleTranslate {
  q: string[];
  target: any;
}

/**
 * class showing list of profiles
 */
@Component({
  selector: "app-profiles",
  templateUrl: "./profiles.component.html",
  styleUrls: ["./profiles.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProfilesComponent implements OnInit, AfterViewInit {
  

  public profileForm: any[] = [];
  public tableEnd = false;
  public branchNames = [];
  public smartTableLoadData: any[] = [];
  public selectedProfilesCreate: any;
  public branches = [];
  public allBranches;
  public groups = [];
  public fullLoad: boolean = true;
  public pgNo: number = 0;
  public selectedItem: any;

  /**
   * variables using in tree-select tag
   */
  public AllowParentSelection: boolean = true;
  public RestructureWhenChildSameName: boolean = false;
  public ShowFilter: boolean = true;
  public Disabled: boolean = false;
  public FilterPlaceholder: string = "";
  public MaxDisplayed: number = 10;

  public simpleSelected: any;
  public map: Map<any, any> = new Map();
  public setting = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    hideSubHeader: true,
    columns: {
      Name: {
        title: "Client Name",
        type: "string",
      },
      ClientID: {
        title: "Client ID",
        type: "string",
      },
      MobileNumber: {
        title: "Mobile Number",
        type: "number",
      },
      Branch: {
        title: "User Linked Branch",
        type: "string",
      },
      Hierarchy: {
        title: "Hierarchy",
        type: "string",
      },
      NationalID: {
        title: "National ID",
        type: "string",
      },
      profileID: {
        title: "ProfileID",
        type: "number",
        show: true,
      },
      profileCreationTime: {
        title: "Profile Creation Time",
        type: "string",
      },
    },

    edit: {
      editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>',
    },
  };
  public filterData = {};
  public showSearchFilter: boolean = false;
  public translateObject: any;
  public langChange: boolean = false;

  /**
   * @constructor
   * @param {ProfileService} profileService - The profile service.
   * @param {TranslateService} translateService - The translate service.
   * @param {Router} _router - The router state service.
   * @param {AppComponent} appComponent - THe app component class.
   * @param {I18NService} i18nService - The I18NService.
   * @param {LoginService} loginService - The login service.
   */
  constructor(
    private profileService: ProfileService,
    private renderer: Renderer2,
    private translateService: TranslateService,
    private _router: Router,
    private appComponent: AppComponent,
    private i18nService: I18NService,
    public loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private cdf: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    if (this.setting.columns["profileID"].hasOwnProperty("show")) {
      if (this.setting.columns["profileID"].show == false) {
        delete this.setting.columns["profileID"];
      }
    }
  }



  /**
   * Executed after constructor
   */
  ngOnInit() {
    this.pgNo = 0;

    /**
     * fetching list of profiles based on pagination
     */
    this.profileService
      .provideProfilePagination(this.pgNo, 10)
      .subscribe((users) => {
        this.load(users["data"]["profiles"]);
      });
  }

  load(data: Array<any>) {
    this.smartTableLoadData = data.map((element) => {
      const hierarchy =
        element["profileDetails"]["Hierarchy"] &&
        this.loginService.map.get(+element["profileDetails"]["Hierarchy"]);

      const branch =
        element["profileDetails"]["branchId"] &&
        this.loginService.map.get(+element["profileDetails"]["branchId"]);

      return {
        profileID: element["profileID"],
        Name: element["profileDetails"]["Name"],
        Hierarchy: hierarchy,
        ClientID: element["profileDetails"]["Identifier"],
        MobileNumber: element["profileDetails"]["Mobile Number"],
        NationalID: element["profileDetails"]["National ID"],
        Branch: branch,
        Email: element["profileDetails"]["Email"],
        "Form Label": element["profileDetails"]["Form Label"],
        profileFormId: element["profileFormID"],
        Address: element["profileDetails"]["Address"],
        FatherSpouseName: element["profileDetails"]["Father / Spouse Name"],
        linkedProfileID: element["linkedProfileID"],
        profileCreationTime: element["profileCreationTime"],
      };
    });

    // Create a new MouseEvent
    var clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    // Dispatch the event on the document or any other element you want to click
    document.dispatchEvent(clickEvent);
    this.cdf.detectChanges();
  }

  ngAfterViewInit(): void {}

  /**
   * To select specific row of table
   * @param event - selected row data
   * @private
   */
  public onUserRowSelect(event): void {
    this.profileService.profileId = event.data;

    this._router.navigate(["../edit-client", event?.data?.profileID], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * Pagination
   * @param action - prev or next page
   * @private
   */
  public pageTurn(action: string): void {
    if (action == "prev") {
      this.pgNo != 0 ? (this.pgNo = this.pgNo - 1) : "";
      this.profileService
        .provideProfilePagination(this.pgNo, 10)
        .subscribe((users) => {
          this.smartTableLoadData = [];
          if (users["data"]["profiles"].length == 0) {
            this.tableEnd = true;
            Swal.fire({
              title: `<h3 class="swal-msg-font swal-title-font">${users["data"]["message"]}</h3>`,
              html: ``,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 1500,
              focusConfirm: true,
              icon: "success",
            });
          } else {
            this.load(users["data"]["profiles"]);
          }
        });
    }
    if (action == "next") {
      this.pgNo = this.pgNo + 1;
      this.profileService
        .provideProfilePagination(this.pgNo, 10)
        .subscribe((users) => {
          if (users["data"]["profiles"].length == 0) {
            this.tableEnd = true;
            Swal.fire({
              title: `<h3 class="swal-msg-font swal-title-font">${users["data"]["message"]}</h3>`,
              html: ``,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 1500,
              focusConfirm: true,
              icon: "success",
            });
          } else {
            this.load(users["data"]["profiles"]);
          }
        });
    }
  }

  // deleteRecord(event): void {
  //   if (window.confirm("Are you sure you want to delete?")) {
  //     this.profileService.deleteProfile(event.data.profileID).subscribe(() => {
  //       event.confirm.resolve();
  //     });
  //   } else {
  //     event.confirm.reject();
  //   }
  // }

  getNestedBranches(obj, label): void {
    this.branchNames.push(obj[label]);
    if (obj.children.length > 0) {
      obj.children.forEach((child) => {
        this.getNestedBranches(child, label);
      });
    }
  }

  /**
   * TO search data
   * @private
   */
  public onSubmitFilter(filterData) {
    // this.appComponent.showLoader = true;
    this.showSearchFilter = true;
    this.pgNo = 0;
    this.tableEnd = false;
    filterData.Hierarchy = this.simpleSelected ? this.simpleSelected : "";
    filterData.Hierarchy
      ? (filterData.Hierarchy = filterData.Hierarchy.current_branch_id)
      : "";
    this.filterData = filterData;
    if (
      !filterData.Identifier &&
      (filterData.Hierarchy == "" ||
        filterData.Hierarchy == "Hierarchy" ||
        filterData.Hierarchy == "0") &&
      !filterData.NationalID &&
      !filterData.Name &&
      !filterData.mobileNumber
    ) {
      this.ngOnInit();
    } else {
      if (filterData.Name.length <= 3 && filterData.Name != "") {
        Swal.fire({
          title: `<h3 class="swal-msg-font swal-title-font">Please!</h3>`,
          html: `<h4 class="swal-msg-font swal-text-font">Enter name more than three character</h4>`,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500,
          focusConfirm: true,
          icon: "info",
        });
        this.appComponent.showLoader = false;
      } else {
        if (filterData.Hierarchy == "0") {
          filterData.Hierarchy = "";
          this.filterData = filterData;
        }
        this.profileService
          .filterProfilesWithPagination(filterData, this.pgNo, 10)
          .subscribe((filtered) => {
            this.smartTableLoadData = [];
            if (filtered["data"]["profiles"].length > 0) {
              this.load(filtered["data"]["profiles"]);
            } else {
              Swal.fire({
                title: `<h3 class="swal-msg-font swal-title-font">Sorry!</h3>`,
                html: `<h4 class="swal-msg-font swal-text-font">No profiles found</h4>`,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1500,
                focusConfirm: true,
                icon: "warning",
              });
            }
          });
      }
    }
  }

  /**
   * Pagination after searching profiles
   * @param action
   * @private
   */
  public pageTurnFilter(action) {
    if (action == "prev") {
      this.pgNo != 0 ? (this.pgNo = this.pgNo - 1) : "";
      this.tableEnd = false;
      this.smartTableLoadData = [];
      this.profileService
        .filterProfilesWithPagination(this.filterData, this.pgNo, 10)
        .subscribe((filtered) => {
          this.load(filtered["data"]["profiles"]);
        });
    } else if (action == "next") {
      this.pgNo = this.pgNo + 1;
      this.profileService
        .filterProfilesWithPagination(this.filterData, this.pgNo, 10)
        .subscribe((filtered) => {
          this.smartTableLoadData = [];
          if (filtered["data"]["profiles"].length == 0) {
            this.tableEnd = true;
          } else {
            this.load(filtered["data"]["profiles"]);
          }
        });
    }
  }
}
