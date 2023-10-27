import { LoginService } from "app/shared/services/login.service";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { ErrorDialogService } from "../services/error-dialog.service";
import { LoadingIndicatorService } from "../services/loading-indicator.service";

export class ErrorHandlerInterceptor implements HttpInterceptor {
  errorService = inject(ErrorDialogService);
  loadingService = inject(LoadingIndicatorService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {}),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * handling each http request's error.
   * @param error
   * @returns Observable
   */
  handleError(error: HttpErrorResponse) {
    // if (!this.loadingService.checkRequestFinished) {
    if (error.error instanceof ErrorEvent) {
      //client side error
    } else {
      // server side error
      //
      switch (error.status) {
        case 401:
          this.errorService.sweetAlertError("Sorry!", this.getErrorMsg(error));
          break;
        case 402:
          this.errorService.sweetAlertError("Sorry!", this.getErrorMsg(error));
          break;
        case 404:
          this.errorService.sweetAlertError("Sorry!", this.getErrorMsg(error));
          break;
        case 500:
          {
            this.errorService.sweetAlertError(
              "Sorry!",
              this.getErrorMsg(error)
            );
            return throwError(error);
          }
          break;
        default:
          if (this.getErrorMsg(error) == "In-correct password") {
            this.errorService.sweetAlertError("Sorry!", "Incorrect PIN");
          } else {
            this.errorService.sweetAlertError(
              "Sorry!",
              this.getErrorMsg(error)
            );
          }
          break;
      }
    }
    this.loadingService.checkRequestFinished = true;
    return throwError(error);
    // }
  }

  /**
   * returning error message from HttpErrorResponse object.
   * @param error
   * @returns string
   */
  getErrorMsg(error: HttpErrorResponse): string {
    if (error.error && error.error.message) {
      return error.error.message;
    }
    return error.message;
  }
}
