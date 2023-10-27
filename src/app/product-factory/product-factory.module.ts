import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ProductFactoryRoutingModule } from "./product-factory-routing.module";
import { routedComponents } from "./product-factory-routing.module";
import { BlocklyComponent } from "./blockly/blockly.component";

@NgModule({
  imports: [CommonModule, ProductFactoryRoutingModule, FormsModule, NgbModule],
  declarations: [...routedComponents, BlocklyComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductFactoryModule {}
