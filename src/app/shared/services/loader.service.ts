import { Injectable, inject } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  // private isLoading = new BehaviorSubject<boolean>(false);
  // public isLoading$ = this.isLoading.asObservable();
  private spinnerService = inject(NgxSpinnerService);

  // constructor(private spinnerService: NgxSpinnerService);

  showLoader() {
    // this.isLoading.next(true);
    this.spinnerService.show();
  }

  hideLoader() {
    // this.isLoading.next(false);
    this.spinnerService.hide();
  }
}
