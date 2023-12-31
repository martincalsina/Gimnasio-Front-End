import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'login', loadChildren: () => import("./login/login.module").then(m => m.LoginModule)},
  {path: 'signup', loadChildren: () => import("./signup/signup.module").then(m => m.SignupModule)},
  {path: 'inicio', loadChildren: () => import("./inicio/inicio.module").then(m => m.InicioModule)},
  {path: 'rutinas', loadChildren: () => import("./rutinas/rutinas.module").then(m => m.RutinasModule)},
  {path: 'entrenamientos', loadChildren: () => import("./entrenamientos/entrenamientos.module").then(m => m.EntrenamientosModule)},
  {path: 'ejercicios', loadChildren: () => import("./ejercicios/ejercicios.module").then(m => m.EjerciciosModule)},
  {path: 'perfil', loadChildren: () => import("./perfil/perfil.module").then(m => m.PerfilModule)},
  {path: '**', pathMatch: 'full', loadChildren: () => import("./error404/error404.module").then(m => m.Error404Module)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
