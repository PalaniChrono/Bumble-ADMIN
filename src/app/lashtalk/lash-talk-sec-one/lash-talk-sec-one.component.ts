// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-lash-talk-sec-one',
//   templateUrl: './lash-talk-sec-one.component.html',
//   styleUrls: ['./lash-talk-sec-one.component.css']
// })
// export class LashTalkSecOneComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//     alert("sectionone");
//   }

// }


import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularMultiSelect } from "angular2-multiselect-dropdown";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/services/api.service";
import { ImageService } from "src/app/services/image.service";


@Component({
  selector: 'app-lash-talk-sec-one',
  templateUrl: './lash-talk-sec-one.component.html',
  styleUrls: ['./lash-talk-sec-one.component.css']
})
export class LashtalkSecOneComponent implements OnInit {productList: any = [];
  section1:boolean=false;
  loading = false;
  loadingBtn = false;
  showPopup = false;
  stockBox = false;
  modalBoxName = '';
  keyword = 'name';
  section_one_dark_title:any = "";
  section_one_content:any="";
  section_two_title:any="";
  section_two_content:any="";
  section_three_title:any="";
  section_three_content:any="";


  // sizeQuantity:any[] = [];

  defaultImage = 'assets/images/loader.gif';

  @ViewChild('auto', { static: false }) auto;
  @ViewChild('auto', { static: false, read: ElementRef }) dishAuto: ElementRef;
  @ViewChild('sizeDropDown', { static: false }) sizeDropDown: AngularMultiSelect;
  @ViewChild('flavourDropDown', { static: false }) flavourDropDown: AngularMultiSelect;

  

  constructor(private apiService: ApiService, private toastr: ToastrService, public router: Router, private imageService: ImageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  
  
    this.getLashtalkContent();

       
  }


  getLashtalkContent(){
    this.loading = true;
    this.apiService.getData('getLashtalkSection').subscribe((data) => {
        const value = data.data;
     
        console.log("getLashtalkSection ",value);
        this.section_one_dark_title = value[0].PFour_SecOne_TxtOne;
        this.section_one_content = value[0].PFour_SecOne_TxtTwo;
        this.section_two_title = value[0].PFour_SecTwo_TxtOne;
        this.section_two_content = value[0].PFour_SecTwo_TxtTwo;
        this.section_three_title = value[0].PFour_SecThree_TxtOne;
        this.section_three_content = value[0].PFour_SecThree_TxtTwo;
        
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }
  
updateSecOne(){
  this.apiCall('update', 'updateLashtalkSectionOne');

}
apiCall(name, url, value: any = '') {
  value = {
    PFour_SecOne_TxtOne : this.section_one_dark_title,
    PFour_SecOne_TxtTwo : this.section_one_content ,
    PFour_SecTwo_TxtOne : this.section_two_title,
    PFour_SecTwo_TxtTwo : this.section_two_content ,
    PFour_SecThree_TxtOne : this.section_three_title,
    PFour_SecThree_TxtTwo : this.section_three_content ,
  
      
  }  
console.log(value);
  this.apiService[name](url, value).subscribe((data) => {
      if (data.error === false) {
          this.toastr.success(data.message);
          this.loadingBtn = false;
      } else {
          this.toastr.error(data.message);
          
          
      }
      this.getLashtalkContent();
  });
}

}

