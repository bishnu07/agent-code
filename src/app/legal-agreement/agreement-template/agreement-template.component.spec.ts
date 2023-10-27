import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AgreementTemplateComponent } from "./agreement-template.component";

describe("AgreementTemplateComponent", () => {
  let component: AgreementTemplateComponent;
  let fixture: ComponentFixture<AgreementTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgreementTemplateComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
})