import { Routes, RouterModule } from "@angular/router";

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  // {
  //   path: "pages",
  //   loadChildren: () =>
  //     import("../../pages/full-pages/full-pages.module").then(
  //       (m) => m.FullPagesModule
  //     ),
  // },
  {
    path: "client",
    loadChildren: () =>
      import("../../profiles/profiles.module").then((m) => m.ProfilesModule),
    title: "Clients",
  },
  {
    path: "blockly",
    loadChildren: () =>
      import("../../product-factory/product-factory.module").then(
        (m) => m.ProductFactoryModule
      ),
    title: "Product factory",
  },
  {
    path: "legal-agreements",
    loadChildren: () =>
      import("../../legal-agreement/legal-agreement.module").then(
        (m) => m.LegalAgreementModule
      ),
    title: "Legal agreements",
  },
];
