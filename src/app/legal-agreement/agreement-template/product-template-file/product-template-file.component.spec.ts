import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTemplateFileComponent } from './product-template-file.component';

describe('ProductTemplateFileComponent', () => {
  let component: ProductTemplateFileComponent;
  let fixture: ComponentFixture<ProductTemplateFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTemplateFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTemplateFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
