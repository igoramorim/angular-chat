import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IopageComponent } from './iopage.component';

describe('IopageComponent', () => {
  let component: IopageComponent;
  let fixture: ComponentFixture<IopageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IopageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
