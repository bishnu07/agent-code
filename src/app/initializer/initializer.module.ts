import { APP_INITIALIZER, NgModule } from "@angular/core";
import { AppInitializerService } from "./services/app-initializer.service";
import { take } from "rxjs/operators";

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (appInitializer: AppInitializerService) => {
        return () => {
          console.log("APP-INITIALIZER");
          appInitializer.fetchAppData();
          return appInitializer.appData$.pipe(take(1));
        };
      },
      deps: [AppInitializerService],
    },
  ],
})
export class InitializerModule {}
