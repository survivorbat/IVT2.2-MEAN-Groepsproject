import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceitemComponent } from './resourceitem.component';

describe('ResourceitemComponent', () => {
  let component: ResourceitemComponent;
  let fixture: ComponentFixture<ResourceitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
