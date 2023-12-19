import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Persona } from '../../../shared/models/shared.models.persona';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CargaService } from '../../../services/carga.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  //formulario reactivo
  signupForm: FormGroup | undefined;

  //variable para ver si el correo ingresado ya está registrado
  public correoRegistrado: boolean = false;
  //variable para ver si el usuario se ha creado exitósamente
  public usuarioCreado: boolean = false;
 
  //datos a ingresar
  public nombre: string = "";
  public apellido: string = "";
  public correo: string = "";
  public password: string = "";
  public confirmedPassword: string = "";

  constructor(private fb: FormBuilder, 
    private dataService: DataService,
    private cargaService: CargaService, 
    private router: Router) {

  }

  ngOnInit(): void {

    //validadores del formulario
    this.signupForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      confirmPassword: ['', [Validators.required, this.matchPassword.bind(this)]],
    });
  }
  
  //la contraseña debe coincidir en los dos campos que se pide
  matchPassword(control: FormControl) {
    const password = this.signupForm ? this.signupForm.get('password')!.value : '';
    return password === control.value ? null : { mismatch: true };
  }
  
  //vemos si un input en particular del formulario cumple con las validaciones
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

      this.correoRegistrado = false;
      
      //si el form es válido, checkeamos que el correo esté disponible
      this.dataService.correoDisponible(this.correo.toLowerCase()).subscribe((correoValido) => {
        
        //activamos la pantalla de carga
        this.cargaService.setCargandoSubject(true);

        if (correoValido) {

          let persona: Persona = new Persona(this.nombre, this.apellido, this.correo, this.password);
          this.dataService.registrarUsuario(persona);
          console.log("Usuario creado");

          this.usuarioCreado = true;
          
          //si se creó al usuario, damos un tiempito para que la persona pueda ver
          //el alert de que se registró exitósamente
          setTimeout(() => {
            console.log("Redireccionamiento a la sección de login");
            this.router.navigate(['/login']);
          }, 5000);

        } else {
          this.correoRegistrado = true;
          console.log("El correo ya se encuentra registrado");         
        }
        
        //desactivamos la pantalla de carga
        this.cargaService.setCargandoSubject(false); 
      });

    } else {
      //mostrar errores al usuario, lo hace Angular con los [class.invalid]
      console.log('Formulario inválido. Corrija los errores.');
    }

  }

}
