import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddTreeComponent } from './btn-add-tree.component';

describe('BtnAddTreeComponent', () => {
  let component: BtnAddTreeComponent;
  let fixture: ComponentFixture<BtnAddTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnAddTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnAddTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
