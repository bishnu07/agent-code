import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  HostListener,
} from "@angular/core";
import { ROUTES } from "./vertical-menu-routes.config";
import { HROUTES } from "../horizontal-menu/HROUTES";

import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { customAnimations } from "../animations/custom-animations";
import { DeviceDetectorService } from "ngx-device-detector";
import { ConfigService } from "../services/config.service";
import { Observable, Subscription, combineLatest, of } from "rxjs";
import { LayoutService } from "../services/layout.service";
import { ProfileService } from "app/profiles/profile.service";
import { take, tap } from "rxjs/operators";
import { SharedService } from "../shared.service";
import { AppService } from "app/app.service";
import { LoginService } from "../services/login.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./vertical-menu.component.html",
  animations: customAnimations,
})
export class VerticalMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("toggleIcon") toggleIcon: ElementRef;
  public menuItems: any[];
  level: number = 0;
  logoUrl = "assets/img/smallogo.png";
  public config: any = {};
  protected innerWidth: any;
  layoutSub: Subscription;
  configSub: Subscription;
  perfectScrollbarEnable = true;
  collapseSidebar = false;
  resizeTimeout;

  public imageUrl;

  public entityName: string = "";

  constructor(
    private router: Router,
    public translate: TranslateService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private deviceService: DeviceDetectorService,
    private loginService: LoginService,
    private profileService: ProfileService,
    private sharedService: SharedService,
    private appService: AppService
  ) {
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;
    this.isTouchDevice();
  }

  ngOnInit() {
    this.menuItems = ROUTES;

    this.loginService.access_token = localStorage.getItem("access_token");
    let entityLimitSize = 21;
    this.sharedService.getUserInfo().subscribe((users) => {
      this.appService.themeColor =
        users["data"]["users"][0]["profileDetails"]["Theme color"];
      this.loginService.rootDetails = users["data"]["users"];
      this.entityName = users["data"]["users"][0]["profileDetails"][
        "Entity Name"
      ]
        ? users["data"]["users"][0]["profileDetails"]["Entity Name"]
        : "Mobile First Finance";
      this.loginService.username =
        users["data"]["users"][0]["profileDetails"]["Identifier"];

      this.loginService.entityFullname = this.entityName;
      this.entityName
        ? this.entityName.length > entityLimitSize
          ? (this.entityName =
              this.entityName.slice(0, entityLimitSize - 1) + "...")
          : (this.entityName = this.entityName)
        : "";
      this.loginService.entityName = this.entityName;
      this.cdr.detectChanges();
      // this.titleService.setTitle(this.entityName);

      this.profileService.getLogo().subscribe((details) => {
        this.loginService.logoDetails = details["data"]["documents"];
        // this.imageUrl =
        //   details["data"]["documents"].length > 0
        //     ? details["data"]["documents"][0]["downloadUrl"].concat(
        //         "?access_token=" + this.loginService.access_token
        //       )
        //     : "";

        this.imageUrl = this.sharedService
          .getLogoUrl(details["data"]["documents"][0]["downloadUrl"])
          .subscribe((res) => {
            console.log(res);
          });
        // this.logoUrl = this.imageUrl ?? "assets/img/smallogo.png";
        this.loginService.logoUrl = this.imageUrl;
        // this.setAppFavicon("/assets/img/down.svg");
      });
    });
  }

  setAppFavicon(faviconLink) {
    let favicon: HTMLLinkElement = document.querySelector("#favicon");
    favicon.href = faviconLink;
  }

  ngAfterViewInit() {
    this.configSub = this.configService.templateConf$.subscribe(
      (templateConf) => {
        if (templateConf) {
          this.config = templateConf;
        }
        this.loadLayout();
        this.cdr.markForCheck();
      }
    );

    this.layoutSub = this.layoutService.overlaySidebarToggle$.subscribe(
      (collapse) => {
        if (this.config.layout.menuPosition === "Side") {
          this.collapseSidebar = collapse;
        }
      }
    );
  }

  @HostListener("window:resize", ["$event"])
  onWindowResize(event) {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(
      (() => {
        this.innerWidth = event.target.innerWidth;
        this.loadLayout();
      }).bind(this),
      500
    );
  }

  loadLayout() {
    if (this.config.layout.menuPosition === "Top") {
      // Horizontal Menu
      if (this.innerWidth < 1200) {
        // Screen size < 1200
        this.menuItems = HROUTES;
      }
    } else if (this.config.layout.menuPosition === "Side") {
      // Vertical Menu{
      this.menuItems = ROUTES;
    }

    if (this.config.layout.sidebar.backgroundColor === "white") {
      // this.logoUrl = "assets/img/logo-dark.png";
      this.logoUrl = "assets/img/smalllogo.png";
    } else {
      // this.logoUrl = "assets/img/logo.png";
      this.logoUrl = "assets/img/smalllogo.png";
    }

    if (this.config.layout.sidebar.collapsed) {
      this.collapseSidebar = true;
    } else {
      this.collapseSidebar = false;
    }
  }

  toggleSidebar() {
    let conf = this.config;
    conf.layout.sidebar.collapsed = !this.config.layout.sidebar.collapsed;
    this.configService.applyTemplateConfigChange({ layout: conf.layout });

    setTimeout(() => {
      this.fireRefreshEventOnWindow();
    }, 300);
  }

  fireRefreshEventOnWindow = function () {
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("resize", true, false);
    window.dispatchEvent(evt);
  };

  CloseSidebar() {
    this.layoutService.toggleSidebarSmallScreen(false);
  }

  isTouchDevice() {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();

    if (isMobile || isTablet) {
      this.perfectScrollbarEnable = false;
    } else {
      this.perfectScrollbarEnable = true;
    }
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }
  }
}
