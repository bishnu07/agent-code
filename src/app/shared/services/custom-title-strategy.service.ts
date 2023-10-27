import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";
import { AppInitializerService } from "app/initializer/services/app-initializer.service";

@Injectable({
  providedIn: "root",
})
export class CustomTitleStrategyService extends TitleStrategy {
  private entityName: string;
  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title) {
      this.title.setTitle(`Mobile First Finance | ${title}`);
    }
  }

  constructor(
    private title: Title,
    private appInitializer: AppInitializerService
  ) {
    console.log("title");
    super();
    this.appInitializer.appData$.subscribe({
      next: (res) => (this.entityName = res.entityName),
      error: (err) => err,
    });
  }
}
