import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ProfilesComponent } from "./profiles.component";
import { CreateProfileComponent } from "./create-profile/create-profile.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "list-of-clients",
        component: ProfilesComponent,
      },
      {
        path: "edit-client/:profileId",
        component: EditProfileComponent,
        title: "Edit profile",
      },
      {
        path: "create-client",
        component: CreateProfileComponent,
        title: "Create profile",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule {}
export const routedComponents = [EditProfileComponent];
