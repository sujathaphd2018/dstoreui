import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Router, ActivatedRoute } from "@angular/router";


@Injectable()
export class DashboardService {
    constructor(private http: Http, private router:Router) { }
  
    getProfiles(id: string) {
     return this.http.get(
                "http://localhost:8080/get-profiles/"+id)
            .map((response: Response) => {
                let category = response.json();
                return category;
        });
    }

    saveProfiles(profile: Object, id: string) {
      return this.http.post("http://localhost:8080/save-profiles/"+id, profile).map((response: Response) => {
                let category = response.json();
                return category;
        });
    }

    register1(user:Object, user1:Object) {
         return this.http.post("http://localhost:3000/upload?id="+user1['id'], user).map((response: Response) => {
                let category = response.json();
                return category;
        });
    }

    verifyUser(user:Object, user1:Object) {
         return this.http.post("http://localhost:3000/verifyImage?id="+user1['id']+"&image="+user1['imageName'], user).map((response: Response) => {
                let category = response.json();
                return category;
        });
    }




    savePrescription(prescription: Object, id: string) {
        
         return this.http.post("http://localhost:8080/save-prescription/"+id, prescription).map((response: Response) => {
                let category = response.json();
                return category;
        });
    }

    getPrescriptionList(id: string) {
        return this.http.get(
                "http://localhost:8080/get-prescription-list/"+id)
            .map((response: Response) => {
                let category = response.json();
                return category;
        });
    }

    deletePrescriptionList(id: string){
        return this.http.get(
                "http://localhost:8080/delete-list/"+id)
            .map((response: Response) => {
                let category = response.json();
                return category;
        });
    }

    register(user:Object) {
     
         return this.http.post("http://localhost:8080/save-user", user).map((response: Response) => {
                let category = response.json();
                return category;
        });
    }

     updateUser(user:Object, id:string) {
     
         return this.http.post("http://localhost:8080/update-user/"+id, user).map((response: Response) => {
                let category = response.json();
                return category;
        });
    }

    getAddress(id:string) {
        return this.http.get(
                "http://localhost:8080/get-address/"+id)
            .map((response: Response) => {
                let category = response.json();
                return category;
        });
    }

    login(user:Object) {
      return this.http.post("http://localhost:8080/login", user).map((response: Response) => {
                let category = response.json();
                return category;
        });
    }

    getHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let requestOptions = new RequestOptions({ headers: headers});
        return requestOptions;
    }
}