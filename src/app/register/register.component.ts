import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import {DashboardService} from '../services/services'
import {Router} from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;

  user:any = {
    "name":'',
    "email":'',
    "password":''
  }	

  showStepTwo : boolean = false;
  userRegisterInfo: any ={}
  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit() {

  }

     upload() {
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let fileCount: number = inputEl.files.length;
        let formData = new FormData();
        if (fileCount > 0) { // a file was selected
            for (let i = 0; i < fileCount; i++) {
                formData.append('terms', inputEl.files.item(i));
            }
            this.dashboardService.register1(formData, this.userRegisterInfo).subscribe(data=>{
               alert("Saved")
               this.router.navigateByUrl('/login');
            })
        }
    }

  registerUser(){
    
    if(this.user.name== "" || this.user.email=="" || this.user.password=="") {
	  	alert("Please Fill all the feilds")
	  }else {
    

	     this.dashboardService.register(this.user).subscribe(data=>{
         alert("Saved please upload an security picture")
        // this.router.navigateByUrl('/login');
          this.userRegisterInfo = data;
          this.showStepTwo = true;

	    })
	  }
  }


}