import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { LoginService } from "app/shared/services/login.service";

@Component({
  selector: "app-template-file-table",
  templateUrl: "./template-file-table.component.html",
  styleUrls: ["./template-file-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateFileTableComponent implements OnInit {
  @Input() contractDocs: any[] = [];

  documents = [];

  accessToken: string = "";

  constructor(
    private loginService: LoginService,
    private cdr: ChangeDetectorRef
  ) {
    this.accessToken = "?access_token=" + this.loginService.access_token;
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  /**
   * Function to download E-sign document using the provided URL and access token.
   * @param docUrl The URL of the document to be downloaded.
   */
  private downloadDoc(docUrl: string): void {
    const url = docUrl.concat(this.accessToken);
    window.location.assign(url);
  }
}
