import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BlocklyComponent } from "./blockly/blockly.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "blockly-editor",
        component: BlocklyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductFactoryRoutingModule {}

export const routedComponents = [BlocklyComponent];
