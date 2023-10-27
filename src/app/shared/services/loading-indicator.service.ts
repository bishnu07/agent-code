import {
  EventEmitter,
  Injectable,
  Component,
  NgModule,
  inject,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { HttpRequest } from "@angular/common/http";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingIndicatorService {
  onLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  spinnerLoader$ = this.onLoading$.asObservable();

  checkRequestFinished: boolean = true;

  /**
   * Stores all currently active requests
   */
  private requests: HttpRequest<any>[] = [];

  /**
   * returning Observable of boolean type
   * @returns
   */
  getLoading$(): Observable<boolean> {
    return this.onLoading$.asObservable();
  }

  /**
   * Adds request to the storage and notifies observers
   */
  onStarted(req: HttpRequest<any>): void {
    this.checkRequestFinished = true;
    this.requests.push(req);
    //
    this.notify();
  }

  /**
   * Removes request from the storage and notifies observers
   */
  onFinished(req: HttpRequest<any>): void {
    const index = this.requests.indexOf(req);
    if (index !== -1) {
      this.requests.splice(index, 1);
      //
    }
    this.notify();
  }

  /**
   * Notifies observers about whether there are any requests on fly
   */
  private notify(): void {
    this.onLoading$.next(this.requests.length !== 0);
    if (this.requests.length !== 0) {
      //
      this.checkRequestFinished = false;
      // document.getElementsByName("body")[0].style.height = "100vh";
    }
  }

  set httpRequestFinished(length) {
    this.requests.length = length;
  }
}
