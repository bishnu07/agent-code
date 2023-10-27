import { Injectable } from "@angular/core";
import * as sweetAlertFunction from "../../shared/data/sweet-alerts";
import { AppService } from "app/app.service";

@Injectable({
  providedIn: "root",
})
export class ErrorDialogService {
  constructor(private appService: AppService) {}

  /**
   * To show confirm message in popup box.
   * @param title
   * @param text
   * @param confirmButtonText
   */
  public sweetAlertConfirm(
    title: string,
    text: string,
    confirmButtonText?: string,
    buttonColor: string = this.appService.themeColor
  ) {
    return sweetAlertFunction.confirmAlertBox(
      title,
      text,
      confirmButtonText,
      buttonColor
    );
  }

  /**
   * To show error message in popup box.
   * @param title
   * @param text
   * @param confirmButtonText
   */
  public sweetAlertError(
    title: string,
    text: string,
    confirmButtonText?: string,
    buttonColor: string = this.appService.themeColor
  ) {
    return sweetAlertFunction.errorAlertBox(
      title,
      text,
      confirmButtonText,
      buttonColor
    );
  }

  /**
   * To show alert message in popup box.
   * @param title
   * @param text
   * @param confirmButtonText
   */
  public infoAlertError(
    title: string,
    text: string,
    confirmButtonText?: string,
    buttonColor: string = this.appService.themeColor
  ) {
    return sweetAlertFunction.infoAlertBox(
      title,
      text,
      confirmButtonText,
      buttonColor
    );
  }
}
