import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateLeftSideComponent } from './template-left-side.component';

describe('templateLeftSideComponent', () => {
  let component: TemplateLeftSideComponent;
  let fixture: ComponentFixture<TemplateLeftSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateLeftSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateLeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
