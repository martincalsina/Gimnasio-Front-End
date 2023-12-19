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
  
  //variable para mostrarle al usuario un alert que dice que pasó mal los datos
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
    
    //carga on
    this.cargaService.setCargandoSubject(true);

    this.dataService.login(this.correo, this.password).subscribe(response => {
      
      console.log("autenticacion exitosa", response);
      
      //se guarda el id del usuario en la sesión
      sessionStorage.setItem("user_id", response.persona_id);
      
      //estamos loggeados, aparece la topbar
      this.sesionService.setSubject(true);
      
      //carga off
      this.cargaService.setCargandoSubject(false);
      
      //vamos al inicio
      this.router.navigate(['/inicio']);

      return response;
    }, error => {

      console.log("error al logearse", error);
      
      //le decimos al usuario que pasó datos erróneos
      this.credencialesIncorrectas = true;
      
      //carga off
      this.cargaService.setCargandoSubject(false);
      
      return null;
    });

  }


}
