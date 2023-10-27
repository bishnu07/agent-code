import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";

export class LoggingInterceptor implements HttpInterceptor {
  startedReqTime: number;
  msg: string;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    this.startedReqTime = new Date().getTime();
    //logging each request's
    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            
            this.msg =
              "succeeded with status:" + event.status + ": " + event.statusText;
          } else {
            this.msg = "";
          }
        },
        (error) =>
          (this.msg =
            error.error +
            "with status:" +
            error.status +
            " and status text:" +
            error.statusText)
      ),
      finalize(() => {
        
          `${req.url}:${this.msg} Request completed in ${
            new Date().getTime() / 1000 - this.startedReqTime / 1000
          } s`
        );
      })
    );
  }
}
