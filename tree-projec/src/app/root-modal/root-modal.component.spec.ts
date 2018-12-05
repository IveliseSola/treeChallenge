import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootModalComponent } from './root-modal.component';

describe('RootModalComponent', () => {
  let component: RootModalComponent;
  let fixture: ComponentFixture<RootModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
