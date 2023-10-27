import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18NService {

  localEvent = new Subject<string>();
  changeLogo = new Subject<any>();
  
  constructor(private translateService: TranslateService, private i18nService: I18NService) {
  }

  changeLocale(locale: string) {
    this.localEvent.next(locale);
  }

  changeDetails(logoUrl) {
    this.changeLogo.next(logoUrl);
  }

}
