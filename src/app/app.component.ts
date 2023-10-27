import { Component, OnInit } from "@angular/core";
import {
  Router,
  NavigationEnd,
  NavigationStart,
  NavigationCancel,
} from "@angular/router";
import { filter } from "rxjs/operators";
import { AppService } from "./app.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoaderService } from "./shared/services/loader.service";
import { AppInitializerService } from "./initializer/services/app-initializer.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  loading: boolean;
  showLoader: boolean = false;
  private history = [];
  showImage = false;
  imageUrl: string;
  fileName: string;
  fileSize: string;
  constructor(
    private router: Router,
    private appService: AppService,
    private modalService: NgbModal,
    public loaderService: LoaderService,
    private appInitalizer: AppInitializerService
  ) {
    this.loading = true;

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.showLoader();
      } else if (event instanceof NavigationEnd) {
        this.loaderService.hideLoader();
        this.history = [...this.history, event.urlAfterRedirects];
      } else if (event instanceof NavigationCancel) {
        this.loaderService.hideLoader();
      }
    });
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Check if there are any open modals in application &&
        // If there are open modals, dismiss them all
        this.modalService.hasOpenModals() && this.modalService.dismissAll();
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    if (this.history.length == 1) {
      return this.history[0];
    } else if (this.history.length > 1) {
      return this.history[this.history.length - 1] || "/index";
    }
  }

  close() {
    this.showImage = false;
    // $(document).ready(function () {
    //   $("body").removeClass("hide_overflow");
    // });
  }

  downloadImage() {
    window.location.assign(this.imageUrl);
  }
}
