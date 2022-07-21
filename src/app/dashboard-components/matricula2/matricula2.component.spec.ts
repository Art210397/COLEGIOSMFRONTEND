import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Matricula2Component } from './matricula2.component';

describe('Matricula2Component', () => {
  let component: Matricula2Component;
  let fixture: ComponentFixture<Matricula2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Matricula2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Matricula2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
