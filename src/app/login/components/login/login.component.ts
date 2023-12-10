import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public correo: string = "";
  public password: string = "";

  constructor(private dataService: DataService) {
  }

public iniciarSesion(): void {
  
  this.dataService.login(this.correo, this.password).subscribe(response => {
    console.log("autenticacion exitosa", response);
    return response;
  }, error => {
    console.log("error al logearse", error);
    return null;
  });

}


}
