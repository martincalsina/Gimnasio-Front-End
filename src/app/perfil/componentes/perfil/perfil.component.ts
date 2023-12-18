import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { CargaService } from '../../../services/carga.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../../../shared/models/shared.models.persona';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  editarPerfilForm: FormGroup | undefined;

  private persona_id: number = -1;
  public usuarioEditado: boolean = false;
  public passwordInvalida: boolean = false;

  public nombre: string = "";
  public apellido: string =  "";
  public correo: string  = "";
  public password: string  = "";

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private cargaService: CargaService) {}

  ngOnInit() {

    this.editarPerfilForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      password: ['', [Validators.required]]
    });

    this.persona_id = parseInt(sessionStorage.getItem('user_id')!);

    this.cargaDatosPersona();

  }

  cargaDatosPersona() {

    this.cargaService.setCargandoSubject(true);

    this.dataService.verPersona(this.persona_id).subscribe((data:any) => {

      this.nombre = data.nombre;
      this.apellido = data.apellido;
      this.correo = data.correo;

      this.cargaService.setCargandoSubject(false);

    });

  }

  editarUsuario() {

    this.usuarioEditado = false;

    if (this.editarPerfilForm?.valid) {

      this.cargaService.setCargandoSubject(true);

      console.log('Formulario válido', this.editarPerfilForm!.value);

      this.passwordInvalida = false;

      //voy a usar el método de login para verficar que me pasan la contraseña correcta
      this.dataService.login(this.correo, this.password).subscribe(response => {

        console.log("Credenciales validadas")

        let persona: Persona = new Persona(this.nombre, this.apellido, this.correo, this.password);

        this.dataService.editarUsuario(this.persona_id, persona).subscribe((r:any) => {

          console.log("Usuario Editado exitósamente: ", r);

          this.usuarioEditado = true;

          this.dataService.getPersonaSubject().next(); //que se actualice la topbar

          this.cargaService.setCargandoSubject(false);

        }, error => {

          console.log("Ocurrió un erro editando al usuario: ", error);

        });

      }, error => {

        console.log("contraseña incorrecta");

        this.passwordInvalida = true;

        this.cargaService.setCargandoSubject(false);

      });

    } else {
      console.log("Formulario inválido. Corrija los errores.")
    }

  }

  inputValido(formControlName: string): boolean {
    if (this.editarPerfilForm!.get(formControlName)?.valid) {
      return true;
    } else {
      return false;
    }
  }



}
