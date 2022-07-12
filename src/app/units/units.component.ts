import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  modalBoxName;
  loadingBtn = false;
  loading = false;
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  unitName;
  unitId;
  editUnitName;
  pincodeList : any = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listAllUnits();
  }

  listAllUnits(){
    this.loading = true;
    this.apiService.getData('getAllUnitList').subscribe((data) => {
        this.pincodeList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

   store(){
    this.loadingBtn = true;
    const value = { unit_name: this.unitName}
    this.apiService.postData(value, 'createUnit').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllUnits();
            this.unitName = '';
        
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

    popUpClose() {
      this.showPopup = false;
      this.errorMsg = [];
  }

  updateUnit() {
    
    this.loadingBtn = true;
    const value = { unit_id: this.unitId, unit_name: this.editUnitName}
    this.apiService.postData(value, 'updateUnit').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.popUpClose();
            this.modalBoxName = 'Create';
            this.listAllUnits();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
    });
  }

  openModalBox(id = '', unit_name='') {
    if (id) {
        this.modalBoxName = 'Edit';
        this.unitId = id;
        this.editUnitName = unit_name;
    } else {
        this.modalBoxName = 'Create';

    }
    this.showPopup = true;
  }

  activateRegion(unit_id){
    console.log(unit_id);
    this.loading = true;
    this.apiService.getData('activateUnit', unit_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllUnits();
        this.loadingBtn = false;
    } else {
        this.toastr.warning(data.message);
        this.loadingBtn = false;
    }
    }, error => {
        this.loading = false;
    });
  }

  deActivateRegion(unit_id){
    this.loading = true;
    this.apiService.getData('deActivateUnit', unit_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllUnits();
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
        text: 'You will not be able to recover this Unit Detail',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            this.apiService.getData('deleteUnit', id).subscribe((data) => {
                if (data.error === false) {
                    this.toastr.success(data.message);
                    this.listAllUnits();
                } else {
                    this.toastr.error(data.message);
                }
            });
  
            Swal.fire(
                'Deleted!',
                'Your Unit detail has been deleted.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your Unit detail file is safe :)',
                'error'
            );
        }
    });
  }


}
