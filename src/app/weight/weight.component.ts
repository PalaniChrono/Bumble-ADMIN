import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent implements OnInit {
  modalBoxName;
  loadingBtn = false;
  loading = false;
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  pincodeList : any = [];
  regionList: any = [];
  unitId: any;
  allowCod: any;
  weightName: any;
  editUnitId;
  editWeightName;
  editAllowCod;
  weightId;
  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listAllWeight();
    this.listAllUnits();
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

   listAllUnits(){
    this.loading = true;
    this.apiService.getData('getAllActiveUnitList').subscribe((data) => {
        this.regionList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

   openModalBox(id = '', unit_id='', weight_name='', allow_cod = '') {
    if (id) {
        this.modalBoxName = 'Edit';
        this.editUnitId = unit_id;
        this.editWeightName = weight_name;
        this.editAllowCod = allow_cod;
        this.weightId  = id;
       
    } else {
        this.modalBoxName = 'Create';

    }
    this.showPopup = true;
  }

  store(){
    this.loadingBtn = true;
    const value = { unit_id: this.unitId, weight_name: this.weightName, allow_cod: this.allowCod}
    this.apiService.postData(value, 'createWeight').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllWeight();
            this.unitId = '';
           this.allowCod='';
            this.weightName=''
            this.popUpClose();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
    }, error => {
        this.loadingBtn = false;
    });
  }
  updateWeight() {
  
    this.loadingBtn = true;
    const value = { unit_id: this.editUnitId, weight_name: this.editWeightName, allow_cod: this.editAllowCod, weight_id:this.weightId}
    this.apiService.postData(value, 'updateWeight').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.popUpClose();
            this.modalBoxName = 'Create';
            this.listAllWeight();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
    });
  }

  activateRegion(weight_id){
    console.log(weight_id);
    this.loading = true;
    this.apiService.getData('activateWeight', weight_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllWeight();
        this.loadingBtn = false;
    } else {
        this.toastr.warning(data.message);
        this.loadingBtn = false;
    }
    }, error => {
        this.loading = false;
    });
  }

  deActivateRegion(weight_id){
    this.loading = true;
    this.apiService.getData('deActivateWeight', weight_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllWeight();
        this.loadingBtn = false;
    } else {
        this.toastr.warning(data.message);
        this.loadingBtn = false;
    }
    }, error => {
        this.loading = false;
    });
  }

  deleteRegion(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Weight Detail',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            this.apiService.getData('deleteWeight', id).subscribe((data) => {
                if (data.error === false) {
                    this.toastr.success(data.message);
                    this.listAllWeight();
                } else {
                    this.toastr.error(data.message);
                }
            });
  
            Swal.fire(
                'Deleted!',
                'Your Weight detail has been deleted.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your Weight detail file is safe :)',
                'error'
            );
        }
    });
  }


  onChange(event){
    if(this.modalBoxName == 'Edit'){
      this.editUnitId = event;
    }else{
      this.unitId = event;
    }
   
    
   }

   onChangeAllow(event){
     
     if(this.modalBoxName == 'Edit'){
     this.editAllowCod = event;
     }else{
      this.allowCod = event;
     }
   }

  popUpClose() {
    this.showPopup = false;
    this.errorMsg = [];
}

}
