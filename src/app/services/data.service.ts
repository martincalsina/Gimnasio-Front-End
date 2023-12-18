import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Persona } from '../shared/models/shared.models.persona';
import { Entrenamiento } from '../shared/models/shared.models.entrenamiento';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  backendUrl = "http://localhost:8080"; //local
  //backendUrl = "https://backend-gimnasio.onrender.com"; //produccion

  private rutinasSubject = new Subject<void>();
  private entrenamientosSubject = new Subject<void>();
  private personaSubject = new Subject<void>(); //pa actualizar el nombre en la topbar si es que se edita

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

  public verPersona(persona_id: number): Observable<any> {
    return this.http.get(`${this.backendUrl}/persona/ver/${persona_id}`);
  }

  public editarUsuario(persona_id: number, persona: Persona): Observable<any> {
    return this.http.put(`${this.backendUrl}/persona/editar`, {
      persona_id: persona_id,
      nombre: persona.getNombre(),
      apellido: persona.getApellido(),
      correo: persona.getCorreo(),
      password: persona.getPassword()
    });
  }

  public getPersonaSubject(): Subject<void> {
    return this.personaSubject;
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

  public borrarRutina(rutina_id: number): Observable<any> {
    return this.http.delete(`${this.backendUrl}/rutina/borrar/${rutina_id}`);
  }

  public editarRutina(rutina_id: number, nombre: string): Observable<any> {
    return this.http.put(`${this.backendUrl}/rutina/editar`, {
      rutina_id: rutina_id,
      nombre: nombre
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

  public obtenerDatosHistoricos(persona_id: number, ejercicio_id: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/ejercicio/datosHistoricos/${persona_id}/${ejercicio_id}`);
  }

}
