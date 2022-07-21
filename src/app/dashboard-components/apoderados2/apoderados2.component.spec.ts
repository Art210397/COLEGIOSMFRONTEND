import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Apoderados2Component } from './apoderados2.component';

describe('Apoderados2Component', () => {
  let component: Apoderados2Component;
  let fixture: ComponentFixture<Apoderados2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Apoderados2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Apoderados2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
