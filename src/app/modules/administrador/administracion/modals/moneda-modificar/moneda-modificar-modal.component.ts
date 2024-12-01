import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { MonedaService } from '../../services/moneda.service';

@Component({
  selector: 'app-moneda-modificar-modal',
  templateUrl: './moneda-modificar-modal.component.html',
  styleUrls: ['./moneda-modificar-modal.component.scss']
})
export class MonedaModificarModalComponent {
  token = localStorage.getItem('token');

  @Input() visible: boolean = false;
  @Input() getId: number | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() userAdded = new EventEmitter<void>();
  userForm: FormGroup = this.fb.group({});

  roles: any[] = [];
  entidades: any[] = [];

  flagEntidad: boolean = false;

  constructor(
    private fb: FormBuilder,
    public _monedaService: MonedaService,
    public _messagesService: MessagesService

  ) {
    this.userForm = this.fb.group({
      tipo: ['', Validators.required],
      sigla: ['', Validators.required],
      cambio: ['', Validators.required],
      estado: ['', Validators.required]
    });

  }

  ngOnChanges(): void {
    if (this.getId !== null && this.getId > 0) {
      this._monedaService.GetMonedaById(this.getId, this.token!)
        .subscribe({
          next: (value) => {
            const { tipo, sigla, cambio, estado } = value;
            this.userForm.patchValue({
              tipo, sigla, cambio, estado
            })

          },
        })
    }

  }
  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const token = localStorage.getItem('token');
      console.log(this.userForm.value);

      this._monedaService.UpdateMoneda(this.userForm.value, this.getId!, token!).subscribe({
        next: () => {
          this._messagesService.MessageSuccess('Moneda Modificada', 'Se modifico la moneda correctamente.');
          this.userAdded.emit();
          this.closeModal();

        },
        error: ({ error }) => {
          this._messagesService.MessageError('Error', error.errors);
        }
      });

    }
  }

}
