import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../services/roles.service';
import { capitalizeFirstLetter } from 'src/app/shared/utils/capitalizeFirstLetter';
import { EntidadeService } from '../../services/entidades.service';
import { UsuariosService } from '../../services/usuarios.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-entidad-modal',
  templateUrl: './entidad-modal.component.html',
  styleUrls: ['./entidad-modal.component.scss']
})
export class EntidadModalComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() userAdded = new EventEmitter<void>(); 
  userForm: FormGroup = this.fb.group({});

  roles: any[] = [];
  entidades: any[] = [];
  selectedRol: string | null = null;

  flagEntidad: boolean = false;

  constructor(
    private fb: FormBuilder,
    public _roleService: RoleService,
    public _entidadeService: EntidadeService,
    public _usuariosService: UsuariosService,
    public _messagesService: MessagesService,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.GetAllRoles();
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      nombre_usuario: ['', Validators.required],
      ci: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      password: ['', Validators.required],
      estado: [true, Validators.required],
      rol_id: ['', Validators.required],
      entidad_id: [null],
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
      if (token !== null) {
        this._usuariosService.CreateUser(this.userForm.value, token).subscribe({
          next: () => {
            this._messagesService.MessageSuccess('Usuario Agregado', 'Se agrego el usuario correctamente.');
            this.userAdded.emit();  

            setTimeout(() => {
              this.closeModal();
            }, 2000);
          },
          error: ({ error }) => {
            this._messagesService.MessageError('Error', error.errors);
          }
        });

      }
    }
  }

  GetAllRoles() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this._roleService.GetRoles(token).subscribe(({ data }) => {
        data.map((value) => {
          value.rol = capitalizeFirstLetter(value.rol);
          this.roles.push({
            label: value.rol,
            value: value.id
          });
        });
      });
    }
  }

  GetAllEntidades() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this._entidadeService.GetEntidades(token).subscribe(({ data }) => {
        data.map((value) => {
          this.entidades.push({
            label: value.denominacion,
            value: value.id
          });
        });

      });
    }
  }

  selectedEntidad() {
    // habilitar dropdown entidad
    console.log(this.selectedRol);

    if (Number(this.selectedRol) === 1) {
      this.flagEntidad = true;
      this.GetAllEntidades();

      // Activo validación para entidad_id
      this.userForm.get('entidad_id')?.setValidators([Validators.required]);
      this.userForm.get('entidad_id')?.updateValueAndValidity(); // Actualizar validadores

    } else {
      this.flagEntidad = false;
      this.userForm.get('entidad_id')?.clearValidators(); // Deshabilitar validación
      this.userForm.get('entidad_id')?.updateValueAndValidity(); // Actualizar validadores
      this.userForm.patchValue({ entidad_id: null });
    }

    this.cdr.detectChanges(); // Forzar detección de cambios





  }
}
