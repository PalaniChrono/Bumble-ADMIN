import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-flavour',
  templateUrl: './flavour.component.html',
  styleUrls: ['./flavour.component.css']
})
export class FlavourComponent implements OnInit {

  modalBoxName;
  loadingBtn = false;
  loading = false;
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  flavourName;
  flavourId;
  editFlavourName;
  pincodeList : any = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listAllFlavour();
  }

  listAllFlavour(){
    this.loading = true;
    this.apiService.getData('getAllFlavourList').subscribe((data) => {
        this.pincodeList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

   store(){
    this.loadingBtn = true;
    const value = { flavour_name: this.flavourName}
    this.apiService.postData(value, 'createFlavour').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllFlavour();
            this.flavourName = '';
        
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

  updateFlavour() {
    
    this.loadingBtn = true;
    const value = { flavour_id: this.flavourId, flavour_name: this.editFlavourName}
    this.apiService.postData(value, 'updateFlavour').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.popUpClose();
            this.modalBoxName = 'Create';
            this.listAllFlavour();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
    });
  }

  openModalBox(id = '', flavour_name='') {
    if (id) {
        this.modalBoxName = 'Edit';
        this.flavourId = id;
        this.editFlavourName = flavour_name;
    } else {
        this.modalBoxName = 'Create';

    }
    this.showPopup = true;
  }

  activateRegion(flavour_id){
    console.log(flavour_id);
    this.loading = true;
    this.apiService.getData('activateFlavour', flavour_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllFlavour();
        this.loadingBtn = false;
    } else {
        this.toastr.warning(data.message);
        this.loadingBtn = false;
    }
    }, error => {
        this.loading = false;
    });
  }

  deActivateRegion(flavour_id){
    this.loading = true;
    this.apiService.getData('deActivateFlavour', flavour_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllFlavour();
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
        text: 'You will not be able to recover this Flavour Detail',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            this.apiService.getData('deleteFlavour', id).subscribe((data) => {
                if (data.error === false) {
                    this.toastr.success(data.message);
                    this.listAllFlavour();
                } else {
                    this.toastr.error(data.message);
                }
            });
  
            Swal.fire(
                'Deleted!',
                'Your Flavour detail has been deleted.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your Flavour detail file is safe :)',
                'error'
            );
        }
    });
  }


}
