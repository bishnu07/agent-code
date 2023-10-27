import { Observable } from "rxjs";
import { XmlBlockInterface } from "../interface/xml-block-interface";
import { HttpClient } from "@angular/common/http";

export class DefaultXml implements XmlBlockInterface {
  constructor(private httpClient: HttpClient) {}

  getDefaultBlocksInXml(templateName: string): Observable<string> {
    return this.httpClient.get(`assets/default-block-xml/${templateName}.xml`, {
      responseType: "text",
    });
  }
}
