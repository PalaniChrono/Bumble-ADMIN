//import { Component, OnInit } from '@angular/core';

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularMultiSelect } from "angular2-multiselect-dropdown";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/services/api.service";
import { ImageService } from "src/app/services/image.service";


@Component({
  selector: 'app-contactdetail',
  templateUrl: './contactdetail.component.html',
  styleUrls: ['./contactdetail.component.css']
})
export class ContactdetailComponent implements OnInit {


   section1:boolean=false;
  loading = false;
  loadingBtn = false;
  showPopup = false;
  stockBox = false;
  modalBoxName = '';
  keyword = 'name';
  address_one:any = "";
  address_two:any="";
  email:any="";
  contact_one:any="";
  contact_two:any="";
  whatsapp:any="";
  facebook:any="";

snapchat:any="";

instagram:any="";




  constructor(private apiService: ApiService, private toastr: ToastrService, public router: Router, private imageService: ImageService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.getContactContent();
  }


  getContactContent(){
    this.loading = true;
    this.apiService.getData('getContactSection').subscribe((data) => {
        const value = data.data;
     
        console.log("getContactSection ",value);
        this.address_one = value[0].address_one;
        this.address_two = value[0].address_two;
        this.email = value[0].email;
        this.contact_one = value[0].contact_one;
        this.contact_two = value[0].contact_two;
        this.whatsapp = value[0].whatsapp;
        this.facebook = value[0].facebook;
        this.snapchat = value[0].snapchat;
        this.instagram = value[0].instagram;
        
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }
  
updateSecOne(){
  this.apiCall('update', 'updateContactSectionOne');

}
apiCall(name, url, value: any = '') {
  value = {
    address_one : this.address_one,
    address_two : this.address_two ,
    email : this.email,
    contact_one : this.contact_one ,
    contact_two : this.contact_two,
    whatsapp : this.whatsapp ,
     facebook : this.facebook ,
      snapchat : this.snapchat ,
       instagram : this.instagram ,
  
      
  }  
console.log(value);
  this.apiService[name](url, value).subscribe((data) => {
      if (data.error === false) {
          this.toastr.success(data.message);
          this.loadingBtn = false;
      } else {
          this.toastr.error(data.message);
          
          
      }
      this.getContactContent();
  });
}












}
