import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../shared/models/shared.models.persona';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  backendUrl = "http://localhost:8080"

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

}
