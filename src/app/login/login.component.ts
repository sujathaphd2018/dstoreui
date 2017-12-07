import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import {DashboardService} from '../services/services'
import {Router} from '@angular/router';
import {LocalStorage, SessionStorage} from 'ngx-webstorage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;

	user:any = {
		"email":"",
		"password":""
	}

	showImageUpload:boolean=false;
	
  @LocalStorage() public userDetails;

  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit() {

  }

  login() {
	this.dashboardService.login(this.user).subscribe(data=>{
		if(data){
			this.userDetails = data;
			this.showImageUpload = true;
			//this.luserDetails= data;
			 //this.router.navigateByUrl('/dashboard');
		}else {
			alert("Invalid User")
		}	
	    
	 })
  }

   verifyImage() {
     let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let fileCount: number = inputEl.files.length;
        let formData = new FormData();
        if (fileCount > 0) { // a file was selected
            for (let i = 0; i < fileCount; i++) {
                formData.append('terms', inputEl.files.item(i));
            }
	this.dashboardService.verifyUser(formData, this.userDetails).subscribe(data=>{
		if(data){
			//this.userDetails = data;
			if(data.imagesAreSame){

				 this.router.navigateByUrl('/dashboard');
			}else {
			alert("Invalid User")
			}
		}else {
			alert("Invalid User")
		}	
	    
	 })
  }

}
}	