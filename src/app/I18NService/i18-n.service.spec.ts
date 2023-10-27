import { TestBed } from '@angular/core/testing';
import { I18NService } from "./i18-n.service";

describe("I18NService", () => {
  let service: I18NService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(I18NService);
  });

 
    it('should create', () => {
      expect(service).toBeTruthy();
    });
 });
