import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18NService {
  localEvent = new Subject<string>();
  changeLogo = new Subject<any>();

  constructor() {
  }

  changeLocale(locale: string) {
    this.localEvent.next(locale);
  }

  changeDetails(logoUrl) {
    this.changeLogo.next(logoUrl);
  }

}
