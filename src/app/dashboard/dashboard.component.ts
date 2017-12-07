import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DashboardService} from '../services/services'
import {FormsModule} from "@angular/forms";
import {LocalStorage, SessionStorage} from 'ngx-webstorage';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  @LocalStorage() public userDetails

  yaddress:any={
    "line1":'',
    "line2":'',
    "pincode":'',
    "landmark":'',

  }
  isOrderPlaced:any = []
  closeResult: string;
  cartList:any = [];
  prescriptionName:string = "";
  profileList:any = [];
  prescriptionList = [];
  totalPrescriptionList = [];
  profile:any = {
    name:'',
    age: ''
  }
  selectedProfile: any = {
  };
  prescription : any = {
    name:'',
    power:'',
    qty:''
  }
  constructor(private modalService: NgbModal, private dashboardService: DashboardService,private router: Router) {
   
  }

   ngOnInit() {
    if(this.userDetails == null) {
       this.router.navigateByUrl('/login');
    }{
      this.getProfiles();
      this.getAllPrescription();
      this.getAddress();
    }
  }


  getAddress() {
  
   this.dashboardService.getAddress(this.userDetails['id']).subscribe(data => {
     this.yaddress = data
    })

  }

  saveAddress(yaddress) {
  
    this.userDetails.address1 = yaddress.address1
    this.userDetails.address2 = yaddress.address2
    this.userDetails.pincode = yaddress.pincode
    this.userDetails.landmark = yaddress.landmark
   
  
    this.dashboardService.updateUser(this.userDetails, this.userDetails['id']).subscribe(data => {
      alert("Address Saved!")
       this.getAddress();
    })
  }

  getProfiles(){

    this.dashboardService.getProfiles(this.userDetails['id']).subscribe(data => {
      this.profileList = data;
    })
  }

  checkout() {
    console.log(this.cartList)
    this.isOrderPlaced.push(1);
    
  }

  addTocart(item: Object) {
    //console.log(item);
     var _item = item;
    if(this.cartList.length <=0) {
      this.cartList.push(item)
      }else{
        for(var i in this.cartList) {
          var _temp = this.cartList[i]
          if(_item['id'] != _temp['id']){
             this.cartList.push(item)
          }
        }
      }
   
  }

  removeFromCart(item: Object) {
    console.log(item)
    var _item = item;
    for(var i in this.cartList) {
      var _temp = this.cartList[i]
      if(_item['id'] == _temp['id']){
        this.cartList.splice(i,1);
      }
    }
  }

  deleteList(item: Object) {
  
    this.dashboardService.deletePrescriptionList(item['id']).subscribe(data=>{
    
      this.getAllPrescription();

    })
  }

  saveNewProfile(profile) {
    //console.log(profile)
    this.dashboardService.saveProfiles(profile, this.userDetails['id']).subscribe(data=>{
      this.getProfiles();
    })
  }

  getSelectedValue(value) {
   this.selectedProfile = value.id;
  }

  addPrescription(prescription) {
    if(this.prescription.name != '' && this.prescription.power != '' && this.prescription.qty != '') {
      this.prescriptionList.push(prescription)
      this.prescription = {
        name:'',
        power:'',
        qty:''
      }
    }else {
      alert("Please fill the prescription data")
    }
  }

  savePrescription() {
    if(this.selectedProfile.id == "" || this.selectedProfile == undefined) {
      alert("Choose Profile to add Prescription")
    }else if(this.prescriptionList.length <=0) {
     alert("Please Add Prescription")
    }
    if(this.prescriptionName == "" || this.prescriptionName == undefined) {
    alert("Please enter an name")
    }else{
      console.log(this.selectedProfile)
      console.log(this.prescriptionList)
      var _temp = {
        "name":this.prescriptionName,
        "profileId" : this.selectedProfile.id,
        "prescriptionList" : this.prescriptionList
      }
      console.log(_temp);
      this.dashboardService.savePrescription(_temp, this.userDetails['id']).subscribe(data=>{
        console.log(data)
        this.getAllPrescription();
        alert("Saved !")
      })
    
    }
  }

  getAllPrescription() {
    this.dashboardService.getPrescriptionList(this.userDetails['id']).subscribe(data=>{
      this.totalPrescriptionList = data;
    })
  }
 

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  logout(){
    this.userDetails = null;
     this.router.navigateByUrl('/login');
  }

 private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

