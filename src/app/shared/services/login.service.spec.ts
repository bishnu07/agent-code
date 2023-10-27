import { TestBed } from '@angular/core/testing';
import { LoginService } from "./login.service";

describe("LoginService", () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(LoginService);
  });

  describe('method1', () => {
    it('should ...', () => {
      expect(service).toBeTruthy();
    });
  });
});
