import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateContentComponent } from './Template-content.component';

describe('TemplateContentComponent', () => {
  let component: TemplateContentComponent;
  let fixture: ComponentFixture<TemplateContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
