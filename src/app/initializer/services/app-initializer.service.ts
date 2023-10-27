import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { filter, map } from "rxjs/operators";

interface AppData {
  themeColor: string;
  logoPath: string;
  entityName: string;
}

@Injectable({
  providedIn: "root",
})
export class AppInitializerService {
  private appData = new BehaviorSubject<AppData | null>(null);
  readonly appData$ = this.appData.asObservable().pipe(
    filter((data) => !!data),
    map((data) => {
      return {
        themeColor: data?.themeColor,
        logoPath: data?.logoPath,
        entityName: data?.entityName,
      };
    })
  );
  constructor(private httpClient: HttpClient) {}

  fetchAppData() {
    this.appData.next({
      themeColor: "green",
      logoPath: "assets/img/smalllogo.png",
      entityName: "Lawfirm",
    });
  }
}
