import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrublicComponent } from './prublic.component';

describe('PrublicComponent', () => {
  let component: PrublicComponent;
  let fixture: ComponentFixture<PrublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
