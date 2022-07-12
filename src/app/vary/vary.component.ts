import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-vary',
  templateUrl: './vary.component.html',
  styleUrls: ['./vary.component.css']
})
export class VaryComponent implements OnInit {
  name = 'Angular';
  
  productForm: FormGroup;
  loading: boolean;
  pincodeList: any = [];
  eggName: Event; 

  variation: any = [ { "weight": 1, "egg": "dd", "eggLess": "dd", "sku": "dd" }, { "weight": 2, "egg": "dd", "eggLess": "dd", "sku": "dd" } ];
 
  constructor(private fb:FormBuilder, private apiService: ApiService, private toastr: ToastrService) {
    
   
  }

  ngOnInit() {
    this.listAllWeight();
  }

  listAllWeight(){
    this.loading = true;
    this.apiService.getData('getAllWeightList').subscribe((data) => {
        this.pincodeList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

   
   removevalue(i) {
     this.variation.splice(i, 1);
   }
 
   addvalue() {
     this.variation.push({ weight: '', egg: '', eggLess:'', sku:''});


   }

   onChange(event){

   }

  onSubmit() {

    
   
  
  }

}
