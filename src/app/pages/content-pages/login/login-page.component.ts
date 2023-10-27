import { UserService } from "./../../../shared/services/user.service";
import { LoginService } from "./../../../shared/services/login.service";
import { Component, ViewChild } from "@angular/core";
import {
  NgForm,
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "app/shared/auth/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from "app/app.service";
import { AppInitializerService } from "app/initializer/services/app-initializer.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  loginFormSubmitted = false;
  isLoginFailed = false;
  rootUser: string;

  passwordHidden: boolean = true; // New variable to track password visibility

  togglePassword() {
    this.passwordHidden = !this.passwordHidden;
  }

  get passwordFieldType() {
    return this.passwordHidden ? "password" : "text";
  }

  loginForm = new UntypedFormGroup({
    userName: new UntypedFormControl("", [Validators.required]),
    password: new UntypedFormControl("", [Validators.required]),
    rememberMe: new UntypedFormControl(true),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private userService: UserService,
    private appService: AppService,
    public appInitializer: AppInitializerService
  ) {
    this.rootUser = this.appService.rootUser;
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loginForm.value["rootUser"] = this.rootUser;

    this.spinner.show(undefined, {
      type: "ball-triangle-path",
      size: "medium",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      fullScreen: true,
    });

    // this.authService
    //   .signinUser(this.loginForm.value.username, this.loginForm.value.password)
    //   .then((res) => {
    //     this.spinner.hide();
    //     this.router.navigate(["/blockly/blockly-editor"]);
    //   })
    //   .catch((err) => {
    //     this.isLoginFailed = true;
    //     this.spinner.hide();
    //
    //   });

    this.userService.checkUserValidation(this.loginForm.value).subscribe(
      (res) => {
        this.spinner.hide();
        if (res["data"].hasOwnProperty("email")) {
          // if 2FA is activated from server then user switches to 2FA verify step.

          this.loginService.loginUser = this.loginForm.value;

          this.loginService.otp2FA = res["data"]["email"];

          this.router.navigate(["/home/banking/otp/verify"]);
        } else if (res["data"].hasOwnProperty("access_token")) {
          // When 2FA is not enabled, user is moved to dashboard directly.

          this.loginService.access_token = res["data"]["access_token"];

          // this.homeService.access_token = res["data"]["access_token"];

          this.authService.setAuthToken(res["data"]["access_token"]);

          this.loginWithout2FA();
        }
      },
      (error) => {
        this.isLoginFailed = true;
        this.loginFormSubmitted = false;

        this.spinner.hide();

        let msg = JSON.parse(error._body);

        alert(msg.message);
      }
    );
  }

  loginWithout2FA(): void {
    //mff access_token
    this.loginService.OauthDetails().subscribe(
      (data) => {
        this.loginService.port = data["portNumber"];

        this.loginService.url = data["url"];

        this.loginService.flag = data["flag"];

        this.loginService.userId = data["userID"];

        this.loginService.rootUserID = data["rootUserID"];

        this.appService.userDetails = data;

        // this.loginProcessing = false;
        if (this.loginService.access_tokenMethod() != 0) {
          // this.router.navigate(["/dashboard/dashboard"]);
          this.router.navigate(["/client/list-of-clients"]);
        }
      },
      (error) => {
        // this.loginProcessing = false;
      }
    );
    // setInterval(() => {
    //   this.loginService.loginOAuthRefresh().subscribe((refreshData) => {
    //     this.loginService.access_token_asw = refreshData["access_token"];

    //     this.loginService.refresh_token = refreshData["refresh_token"];
    //   });
    // }, 10800000);
  }
}
