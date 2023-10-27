import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { LoadingIndicatorService } from "../services/loading-indicator.service";
import { finalize, tap } from "rxjs/operators";

export class LoaderInterceptor implements HttpInterceptor {
  loaderService = inject(LoadingIndicatorService);
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add { headers: { "Hide-Loader": "true" } } in request headers to hide loader.
    if (req.headers.has("Hide-Loader")) {
      const headers = req.headers.delete("Hide-Loader");
      req = req.clone({ headers });
    } else {
      // emit onStarted event before request execution
      this.loaderService.onStarted(req);
    }

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
        }
      }),
      // emit onFinished event after request execution
      finalize(() => {
        //
        setTimeout(() => {
          this.loaderService.onFinished(req);
        }, 500);
      })
    );
  }
}
