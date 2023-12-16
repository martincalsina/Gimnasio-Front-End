import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { SesionService } from '../../../services/sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public correo: string = "";
  public password: string = "";

  constructor(private dataService: DataService, 
    private sesionService: SesionService, private router: Router) {
  }

  public iniciarSesion(): void {

    this.dataService.login(this.correo, this.password).subscribe(response => {
      
      console.log("autenticacion exitosa", response);

      sessionStorage.setItem("user_id", response.persona_id);

      this.sesionService.setSubject(true);

      this.router.navigate(['/inicio']);

      return response;
    }, error => {
      console.log("error al logearse", error);
      return null;
    });

  }


}
