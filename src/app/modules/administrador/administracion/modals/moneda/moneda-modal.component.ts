import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { MonedaService } from '../../services/moneda.service';

@Component({
  selector: 'app-moneda-modal',
  templateUrl: './moneda-modal.component.html',
  styleUrls: ['./moneda-modal.component.scss']
})
export class MonedaModalComponent {
  token = localStorage.getItem('token');

  @Input() visible: boolean = false;
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

  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      tipo: ['', Validators.required],
      sigla: ['', Validators.required],
      cambio: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const token = localStorage.getItem('token');
      console.log(this.userForm.value);

      this._monedaService.CreateMoneda(this.userForm.value, token!).subscribe({
        next: () => {
          this._messagesService.MessageSuccess('Moneda Agregada', 'Se agrego la moneda correctamente.');
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
