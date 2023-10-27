import { Injectable, inject } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { map, switchMap } from "rxjs/operators";
import { from, of } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // injecting LoginService to get token once user logs in.
  authService = inject(AuthService);
  private httpHeaders = new HttpHeaders();
  //   {
  //   Accept: "multipart/form-data",
  // }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add custom header
    if (
      !request.url.includes("https://uat.solitx.io:") &&
      !request.url.includes("https://backoffice.solitx.io:") &&
      !request.url.includes("https://dev.solitx.io:") &&
      !request.url.includes("/LoginService/login") &&
      !request.url.includes("/userValidation") &&
      !request.url.includes("/file")
    ) {
      // const customReq = this.addAuth(request);
      // send cloned request with header to the next handler.
      return this.addAuth(request).pipe(switchMap((req) => next.handle(req)));

      // return next.handle(customReq).do((ev: HttpEvent<any>) => {
      //   if (ev instanceof HttpResponse) {
      //
      //   }
      // })
    } else if (request.url.includes("/file")) {
      const req = request.clone({
        headers: this.httpHeaders.set(
          "Authorization",
          `Bearer ${this.authService.getToken()}`
        ),
      });
      return next.handle(req);
    } else {
      return next.handle(request);
    }
  }

  // adding auth token in every request header.
  private addAuth(original: HttpRequest<any>): Observable<HttpRequest<any>> {
    return of(this.authService.getToken()).pipe(
      map((token) => {
        const req = original.clone({
          headers: this.httpHeaders
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json; charset=utf-8"),
        });
        return req;
      })
    );
  }
}
