import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Persona } from '../../../shared/models/shared.models.persona';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit, OnChanges{

  public nombre: string = "";
  public apellido: string = "";
  public correo: string = "";
  public password: string = "";
  public confirmedPassword: string = "";

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    
  }

  registrarUsuario(): void {

    this.dataService.correoDisponible(this.correo.toLowerCase()).subscribe((correoValido) => {
      if (correoValido) {
        let persona: Persona = new Persona(this.nombre, this.apellido, this.correo, this.password);
        this.dataService.registrarUsuario(persona);
        console.log("Usuario creado");
      } else {
        console.log("El correo ya se encuentra registrado");
      }
    });

  }

}
