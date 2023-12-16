import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Persona } from '../../../shared/models/shared.models.persona';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup | undefined;

  public nombre: string = "";
  public apellido: string = "";
  public correo: string = "";
  public password: string = "";
  public confirmedPassword: string = "";

  constructor(private fb: FormBuilder, private dataService: DataService) {

  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      confirmPassword: ['', [Validators.required, this.matchPassword.bind(this)]],
    });
  }

  matchPassword(control: FormControl) {
    const password = this.signupForm ? this.signupForm.get('password')!.value : '';
    return password === control.value ? null : { mismatch: true };
  }

  inputValido(formControlName: string): boolean {
    if (this.signupForm!.get(formControlName)?.valid) {
      return true;
    } else {
      return false;
    }
  }

  registrarUsuario(): void {

    if (this.signupForm!.valid) {

      console.log('Formulario válido', this.signupForm!.value);

      this.dataService.correoDisponible(this.correo.toLowerCase()).subscribe((correoValido) => {
        if (correoValido) {
          let persona: Persona = new Persona(this.nombre, this.apellido, this.correo, this.password);
          this.dataService.registrarUsuario(persona);
          console.log("Usuario creado");
        } else {
          console.log("El correo ya se encuentra registrado");
        }
      });

    } else {
      // Mostrar errores al usuario
      console.log('Formulario inválido. Corrija los errores.');
    }

  }

}
