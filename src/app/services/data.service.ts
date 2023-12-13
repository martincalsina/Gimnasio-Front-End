import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Persona } from '../shared/models/shared.models.persona';
import { Entrenamiento } from '../shared/models/shared.models.entrenamiento';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  backendUrl = "http://localhost:8080";

  private rutinasSubject = new Subject<void>();
  private entrenamientosSubject = new Subject<void>();

  constructor(private http: HttpClient) { 
  }

  public registrarUsuario(persona: Persona): void {
    this.http.post(`${this.backendUrl}/persona/crear`, {
      correo: persona.getCorreo(),
      password: persona.getPassword(),
      nombre: persona.getNombre(),
      apellido: persona.getApellido()
    }).subscribe(response => {
      console.log('Usuario registrado con éxito', response);
    }, error => {
      console.error('Error al registrar usuario', error);
    });
  }

  public correoDisponible(correo: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.backendUrl}/persona/correoDisponible/${correo}`);
  }

  public login(correo: string, password:string): Observable<any>  {
    return this.http.post(`${this.backendUrl}/persona/login`, {
      correo: correo,
      password: password
    })
  }

  public rutinasDe(persona_id: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/rutina/listar/persona_id/${persona_id}`);
  }

  public getRutinasSubject(): Subject<void> {
    return this.rutinasSubject;
  }

  public agregarRutina(persona_id: number, nombreNuevaRutina: string): Observable<any> {
    this.rutinasSubject.next();
    return this.http.post(`${this.backendUrl}/rutina/crear`, {
      persona_id: persona_id,
      nombre: nombreNuevaRutina
    });
  }

  public entrenamientosDe(persona_id: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/entrenamiento/listar/persona_id/${persona_id}`);
  }

  public getEntrenamientosSubject(): Subject<void> {
    return this.entrenamientosSubject;
  }

  public getSetsDe(entrenamiento_id: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/set/listar/entrenamiento_id/${entrenamiento_id}`);
  }

  public getEjercicios(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/ejercicio`);
  }

  public agregarEntrenamiento(entrenamiento: Entrenamiento): Observable<any> {
    return this.http.post(`${this.backendUrl}/entrenamiento/crear/completo`, {
      rutina_id: entrenamiento.getRutinaId(),
      fecha: entrenamiento.getFecha(),
      sets: entrenamiento.getSets()
    });
  }

  public getEntrenamiento(entrenamiento_id: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/entrenamiento/ver/${entrenamiento_id}`);
  }

  public borrarEntrenamiento(entrenamiento_id: number): Observable<any> {
    return this.http.delete(`${this.backendUrl}/entrenamiento/borrar/${entrenamiento_id}`);
  }

  public editarEntrenamiento(entrenamiento_id: number, entrenamiento: Entrenamiento): Observable<any> {
    return this.http.put(`${this.backendUrl}/entrenamiento/editar`, {
      entrenamiento_id: entrenamiento_id,
      rutina_id: entrenamiento.getRutinaId(),
      fecha: entrenamiento.getFecha(),
      sets: entrenamiento.getSets()
    });
  }

}
