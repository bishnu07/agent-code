import { Observable } from "rxjs";

export interface XmlBlockInterface {
  getDefaultBlocksInXml: (
    templateName: string,
  ) => Observable<string>;
}
