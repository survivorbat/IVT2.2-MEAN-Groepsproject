import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatareaComponent } from './chatarea.component';

describe('ChatareaComponent', () => {
  let component: ChatareaComponent;
  let fixture: ComponentFixture<ChatareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
