import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../../material.module';
import { CommonModule } from '@angular/common';
import { AlumnosService } from './services/alumnos';
import { AlumnoResponse } from '../../shared/models/alumno.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultResponse } from '../../shared/models/default.interface';
import Swal from 'sweetalert2';
import { AlumnosDialog } from './components/alumnos-dialog/alumnos-dialog';

@Component({
  selector: 'app-alumnos',
  imports: [MaterialModule, CommonModule],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.scss'
})
export class Alumnos implements OnInit {
  displayedColumns: string[] = ["numero_control", "nombre", "email", "fecha_registro", "actions"];
  alumnos = new MatTableDataSource<AlumnoResponse>();

  constructor(
    private alumnoSvc: AlumnosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  private openSuccess(msg?: string) {
    this.snackBar.dismiss();
    this.snackBar.open(msg || 'Operación exitosa', 'OK', {
      duration: 3000,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  listar() {
    this.alumnoSvc.getAlumnos()
      .subscribe((alumnos: AlumnoResponse[]) => {
        this.alumnos.data = alumnos;
      });
  }

  onOpenModal(alumno: any = {}) {
    const dialogRef = this.dialog.open(AlumnosDialog, {
      minWidth: '60%',
      data: {
        title: 'Registro de Alumnos',
        alumno
      }
    });
    
    dialogRef.afterClosed().subscribe((result: DefaultResponse) => {
      if (result) {
        this.listar();
      }
    });
  }

  onDelete(cveUsuario: number) {
    Swal.fire({
      title: '',
      text: '¿Realmente desea eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'darkBlue',
      cancelButtonColor: 'darkRed',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnoSvc.deleteAlumno(cveUsuario).subscribe((res: DefaultResponse) => {
          this.openSuccess(res?.mensaje ?? 'Usuario eliminado correctamente');
            this.listar();
        });
      }
    });
  }
}
