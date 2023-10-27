import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";
import { AuthGuard } from "./shared/auth/auth-guard.service";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "pages/login",
    pathMatch: "full",
  },
  {
    path: "",
    component: FullLayoutComponent,
    data: { title: "full Views" },
    children: Full_ROUTES,
    canActivate: [AuthGuard],
  },
  {
    path: "",
    component: ContentLayoutComponent,
    data: { title: "content Views" },
    children: CONTENT_ROUTES,
  },
  // {
  //   path: "**",
  //   redirectTo: "pages/error",
  // },
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {
    //   preloadingStrategy: PreloadAllModules,
    //   relativeLinkResolution: "legacy",
    // }),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
