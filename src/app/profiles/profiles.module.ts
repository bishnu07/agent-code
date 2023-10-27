import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ProfilesRoutingModule,
  routedComponents,
} from "./profiles-routing.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ExpandMode, NgxTreeSelectModule } from "ngx-tree-select";

import { AppService } from "../app.service";
import { ProfileService } from "./profile.service";
import { ProfilesComponent } from "./profiles.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateProfileComponent } from "./create-profile/create-profile.component";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    // Ng2TelInputModule,
    NgxTreeSelectModule.forRoot({
      idField: "branchid",
      textField: "branch_name",
      expandMode: ExpandMode.Selection,
    }),
    ProfilesRoutingModule,
  ],
  declarations: [
    ...routedComponents,
    ProfilesComponent,
    EditProfileComponent,
    CreateProfileComponent,
  ],
  providers: [ProfileService, AppService],
})
export class ProfilesModule {}
