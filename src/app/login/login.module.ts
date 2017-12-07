import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {FormsModule} from "@angular/forms";
import { WebStorageModule } from 'ngx-store';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    WebStorageModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
