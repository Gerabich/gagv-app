import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import { AlumnoResponse } from '../../../shared/models/alumno.interface';
import { DefaultResponse } from '../../../shared/models/default.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getAlumnos(): Observable<AlumnoResponse[]> {
    return this.http.get<AlumnoResponse[]>(`${environment.API_URL}/usuarios`)
      .pipe(catchError((error) => this.handlerError(error)));
  }

  newAlumno(alumno: AlumnoResponse): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${environment.API_URL}/usuarios`, alumno)
      .pipe(catchError((error) => this.handlerError(error)));
  }

  updateAlumno(alumno: { cveUsuario: number } & Partial<AlumnoResponse>): Observable<DefaultResponse> {
    const { cveUsuario, ...data } = alumno;
    return this.http.put<DefaultResponse>(`${environment.API_URL}/usuarios/${cveUsuario}`, data)
      .pipe(catchError((error) => this.handlerError(error)));
  }

  deleteAlumno(cveUsuario: number): Observable<DefaultResponse> {
    return this.http.delete<DefaultResponse>(`${environment.API_URL}/usuarios/${cveUsuario}`)
      .pipe(catchError((error) => this.handlerError(error)));
  }

  handlerError(error: any): Observable<never> {
    var errorMessage = "Ocurrió un error";
    if (error.error) {
      errorMessage = `Error: ${error.error.mensaje}`;
    }
    this.snackBar.open(errorMessage, '', {
      duration: 5 * 1000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
    return throwError(() => new Error(errorMessage));
  }
}
