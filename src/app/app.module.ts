import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { WebStorageModule } from 'ngx-store';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';

/* Feature Module */

import {LoginModule} from "./login/login.module"
import {DashboardModule} from "./dashboard/dashboard.module"
import {RegisterModule} from "./register/register.module"

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

/*services*/

import { DashboardService } from "./services/services"


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    WebStorageModule,
    LoginModule,
    RegisterModule,
    DashboardModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
