import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Persona } from '../shared/models/shared.models.persona';

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

}
