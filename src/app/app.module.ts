import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { AgmCoreModule } from "@agm/core";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { StoreModule } from "@ngrx/store";
import { DragulaService } from "ng2-dragula";
import { NgxSpinnerModule } from "ngx-spinner";

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
// import * as fromApp from "./store/app.reducer";
import { AppComponent } from "./app.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { AuthService } from "./shared/auth/auth.service";
import { AuthGuard } from "./shared/auth/auth-guard.service";
import { WINDOW_PROVIDERS } from "./shared/services/window.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatPaginatorModule } from "@angular/material/paginator";
import { EditProfileComponent } from "./profiles/edit-profile/edit-profile.component";
import { LoaderInterceptor } from "./shared/interceptors/loader-interceptor";
import { TokenInterceptor } from "./shared/interceptors/token.interceptor";
import { ErrorHandlerInterceptor } from "./shared/interceptors/error-handler.interceptor";
import { BrowserModule } from "@angular/platform-browser";
import { ProfilesComponent } from "./profiles/profiles.component";
import { CreateProfileComponent } from "./profiles/create-profile/create-profile.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { CustomTitleStrategyService } from "./shared/services/custom-title-strategy.service";
import { TitleStrategy } from "@angular/router";
import { InitializerModule } from "./initializer/initializer.module";
import { ColorPickerModule } from "ngx-color-picker";

import { Ng2TelInputModule } from "ng2-tel-input";

var firebaseConfig = {
  apiKey: "AIzaSyC9XfnIpwNoSv7cyAsoccFQ5EYPd7lZXrk", //YOUR_API_KEY
  authDomain: "apex-angular.firebaseapp.com", //YOUR_AUTH_DOMAIN
  databaseURL: "https://apex-angular.firebaseio.com", //YOUR_DATABASE_URL
  projectId: "apex-angular", //YOUR_PROJECT_ID
  storageBucket: "apex-angular.appspot.com", //YOUR_STORAGE_BUCKET
  messagingSenderId: "447277845463", //YOUR_MESSAGING_SENDER_ID
  appId: "1:447277845463:web:9a7db7aaeaf3a7217a9992", //YOUR_APP_ID
  measurementId: "G-ZVSYZRJ211", //YOUR_MEASUREMENT_ID
};

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
    ProfilesComponent,
    EditProfileComponent,
    CreateProfileComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    // StoreModule.forRoot(fromApp.appReducer),
    FormsModule,
    ReactiveFormsModule,
    InitializerModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    Ng2TelInputModule,
    SharedModule,
    HttpClientModule,
    ColorPickerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCERobClkCv1U4mDijGm1FShKva_nxsGJY",
    }),
    PerfectScrollbarModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    DragulaService,

    { provide: TitleStrategy, useClass: CustomTitleStrategyService },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    WINDOW_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoggingInterceptor,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
