import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TopbarComponent } from './topbar/components/topbar/topbar.component';
import { TopbarModule } from './topbar/topbar.module';
import { RouterLink, RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterLink,
    RouterModule
  ],
  exports: [
    TopbarModule
  ]
})
export class SharedModule { }
