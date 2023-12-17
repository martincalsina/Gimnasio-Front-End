import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { SesionService } from '../../../services/sesion.service';
import { CargaService } from '../../../services/carga.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public credencialesIncorrectas: boolean = false;

  public correo: string = "";
  public password: string = "";

  constructor(private dataService: DataService, 
    private sesionService: SesionService, 
    private router: Router,
    private cargaService: CargaService) {
  }

  public iniciarSesion(): void {

    this.credencialesIncorrectas = false;

    this.cargaService.setCargandoSubject(true);

    this.dataService.login(this.correo, this.password).subscribe(response => {
      
      console.log("autenticacion exitosa", response);

      sessionStorage.setItem("user_id", response.persona_id);

      this.sesionService.setSubject(true);

      this.cargaService.setCargandoSubject(false);

      this.router.navigate(['/inicio']);

      return response;
    }, error => {

      console.log("error al logearse", error);

      this.credencialesIncorrectas = true;

      this.cargaService.setCargandoSubject(false);
      
      return null;
    });

  }


}
