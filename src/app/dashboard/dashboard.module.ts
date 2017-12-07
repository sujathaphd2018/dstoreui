import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from "@angular/forms";



@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
