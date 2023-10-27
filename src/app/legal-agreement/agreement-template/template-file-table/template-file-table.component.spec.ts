import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFileTableComponent } from './template-file-table.component';

describe('TemplateFileTableComponent', () => {
  let component: TemplateFileTableComponent;
  let fixture: ComponentFixture<TemplateFileTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateFileTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
