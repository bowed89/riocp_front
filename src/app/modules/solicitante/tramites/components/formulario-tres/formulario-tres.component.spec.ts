import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTresComponent } from './formulario-tres.component';

describe('FormularioTresComponent', () => {
  let component: FormularioTresComponent;
  let fixture: ComponentFixture<FormularioTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioTresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
