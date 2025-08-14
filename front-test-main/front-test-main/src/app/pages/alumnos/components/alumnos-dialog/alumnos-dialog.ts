import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../../../material.module';
import { CommonModule } from '@angular/common';
import { BaseForm } from '../../../../shared/utils/base-form';
import { AlumnosService } from '../../services/alumnos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { AlumnoResponse } from '../../../../shared/models/alumno.interface';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-alumnos-dialog',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './alumnos-dialog.html',
  styleUrl: './alumnos-dialog.scss'
})
export class AlumnosDialog implements OnInit {
  actionTODO = Action.NEW;
  titleButton = "Guardar";
  alumnoForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AlumnosDialog>,
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private snackBar: MatSnackBar,
    private alumnoSvc: AlumnosService
  ) { }

  ngOnInit(): void {
    this.alumnoForm = this.fb.group({
      cveUsuario: [''],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      numero_control: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.minLength(3)]],
    });
    this.pathData();
  }

  private showSuccessAndClose(msg: string, res: any) {
    const ref = this.snackBar.open(msg, 'OK', {
      duration: 3000,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });

    ref.afterOpened().pipe(take(1)).subscribe(() => {
      this.dialogRef.close(res);
    });
  }

  onSave() {
    if (this.alumnoForm.invalid) return;
    const v = this.alumnoForm.getRawValue();

    if (this.actionTODO == Action.NEW) {
      const payload = {
        numero_control: v.numero_control,
        nombre: v.nombre,
        apellidos: v.apellidos,
        correo: v.correo,
        username: v.username,
        password: v.password
      };
      this.alumnoSvc.newAlumno(payload).subscribe({
        next: (res) => this.showSuccessAndClose('Usuario creado correctamente', res)
      });
    } else {
      const payloadUpdate: any = {
        cveUsuario: v.cveUsuario ? parseInt(v.cveUsuario) : 0,
        numero_control: v.numero_control,
        nombre: v.nombre,
        apellidos: v.apellidos,
        correo: v.correo,
        username: v.username,
      };
      if (v.password && v.password.trim() !== '') {
        payloadUpdate.password = v.password;
      }
      this.alumnoSvc.updateAlumno(payloadUpdate).subscribe({
        next: (res) => this.showSuccessAndClose('Usuario actualizado correctamente', res)
      });
    }
  }

  pathData() {
    if (this.data.alumno?.cveUsuario) {
      this.actionTODO = Action.EDIT;
      this.titleButton = "Editar";

      this.alumnoForm.patchValue({
        cveUsuario: this.data.alumno?.cveUsuario,
        nombre: this.data.alumno.nombre,
        apellidos: this.data.alumno.apellidos,
        correo: this.data.alumno.correo,
        numero_control: this.data.alumno.numero_control,
        username: this.data.alumno.username,
      });

      this.alumnoForm.get('password')?.clearValidators();
      this.alumnoForm.get('password')?.addValidators([Validators.minLength(3)]);
      this.alumnoForm.get('password')?.updateValueAndValidity();
    } else {
      this.alumnoForm.get('password')?.setValidators([Validators.required, Validators.minLength(3)]);
      this.alumnoForm.get('password')?.updateValueAndValidity();
    }
  }

  onClear() {
    this.alumnoForm.reset();
  }
}
