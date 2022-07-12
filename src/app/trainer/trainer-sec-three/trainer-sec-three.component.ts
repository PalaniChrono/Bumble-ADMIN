// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-trainer-sec-three',
//   templateUrl: './trainer-sec-three.component.html',
//   styleUrls: ['./trainer-sec-three.component.css']
// })
// export class TrainerSecThreeComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer-sec-three',
    templateUrl: './trainer-sec-three.component.html',
     styleUrls: ['./trainer-sec-three.component.css']
})
export class TrainerSecThreeComponent implements OnInit {productList: any = [];
  loading = false;
  loadingBtn = false;
  showPopup = false;
  stockBox = false;
  modalBoxName = '';
  keyword = 'name';
  section_one_image:any = "";
  section_one_content:any="";
  section_two_content:any="";
  section_three_content:any="";
  

  // sizeQuantity:any[] = [];

  defaultImage = 'assets/images/loader.gif';

  @ViewChild('auto', { static: false }) auto;
  @ViewChild('auto', { static: false, read: ElementRef }) dishAuto: ElementRef;
  @ViewChild('sizeDropDown', { static: false }) sizeDropDown: AngularMultiSelect;
  @ViewChild('flavourDropDown', { static: false }) flavourDropDown: AngularMultiSelect;

  

  constructor(private apiService: ApiService, private toastr: ToastrService, public router: Router, private imageService: ImageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  
  
    this.getTrainerContent();

       
  }


  getTrainerContent(){
    this.loading = true;
    this.apiService.getData('getTrainerSection').subscribe((data) => {
        const value = data.data;
     
        console.log("getTrainerSection ",value);
        this.section_one_image = value[0].PThree_SecOne_Img;
        this.section_one_content = value[0].PThree_SecOne_Txt;
        this.section_two_content = value[0].PThree_SecTwo_Txt;
        this.section_three_content = value[0].PThree_SecThree_Txt;
       
        
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }
  
updateSecOne(){
  this.apiCall('update', 'updateTrainerSectionOne');

}
apiCall(name, url, value: any = '') {
  value = {
    PThree_SecOne_Img : this.section_one_image,
    PThree_SecOne_Txt : this.section_one_content ,
    PThree_SecTwo_Txt : this.section_two_content,
    PThree_SecThree_Txt : this.section_three_content ,
  
  
      
  }  
console.log(value);
  this.apiService[name](url, value).subscribe((data) => {
      if (data.error === false) {
          this.toastr.success(data.message);
          this.loadingBtn = false;
      } else {
          this.toastr.error(data.message);
          
          
      }
      this.getTrainerContent();
  });
}

}

