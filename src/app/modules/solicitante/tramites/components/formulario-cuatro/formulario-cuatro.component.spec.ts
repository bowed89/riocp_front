import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCuatroComponent } from './formulario-cuatro.component';

describe('FormularioCuatroComponent', () => {
  let component: FormularioCuatroComponent;
  let fixture: ComponentFixture<FormularioCuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCuatroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
