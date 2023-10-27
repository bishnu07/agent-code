import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AgreementTemplateComponent } from "./agreement-template/agreement-template.component";
import { ProductTemplateFileComponent } from "./agreement-template/product-template-file/product-template-file.component";
import { TemplateFileTableComponent } from "./agreement-template/template-file-table/template-file-table.component";
import { FileSizePipe } from "app/shared/pipes/filesize.pipe";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: AgreementTemplateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalAgreementRoutingModule {}

export const routedComponents = [
  AgreementTemplateComponent,
  ProductTemplateFileComponent,
  TemplateFileTableComponent,
  FileSizePipe,
];
