import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-latest-arrival',
  templateUrl: './latest-arrival.component.html',
  styleUrls: ['./latest-arrival.component.css']
})
export class LatestArrivalComponent implements OnInit {

  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  showPopup = false;
  loading = false;
  latestArrivalList: any = [];
  latestArrivalName = '';
  editBannerId = '';
  modalBoxName;
  loadingBtn = false;
  viewBox = false;
  viewImagePreview = '';
  viewNamePreview = '';
  showImage = true;
  imageUrl = '';
  viewImageDisc = '';
  defaultImage = 'assets/images/loader.gif';

  constructor(private apiService: ApiService, private toastr: ToastrService, private imageService: ImageService) { }

  ngOnInit() {
      this.index();
      this.imageUrl = this.imageService.getImageUrl();
  }


 

  index() {
      this.loading = true;
      this.apiService.index('latestArrival').subscribe(data => {
          this.latestArrivalList = data.data;
          this.loading = false;
      });
  }


  store() {
      this.loadingBtn = true;
      this.apiCall('store', 'latestArrival');
  }

  show(id) {
      this.apiService.show('latestArrival/' + id).subscribe((data) => {
          const value = data.data;
          this.latestArrivalName = value.banner_name;
          this.editBannerId = id;
      });
  }

  update(id) {
      this.loadingBtn = true;
      this.apiCall('update', 'latestArrival/' + id);
  }

  destroy(id) {
      this.swalCall(id);
  }

  latestArrivalSwitch(id) {
    alert(id);
      this.apiCall('getData', 'latestArrivalSwitch/' + id);
  }

 
  apiCall(name, url, value: any = '') {
    value = name === 'store' || name === 'update' ? {
      latest_arrival_name: this.latestArrivalName,
    } : value;
    this.apiService[name](url, value).subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.loadingBtn = false;
            this.popUpClose();
            this.index();
        } else {
            this.toastr.error(data.message);
            this.loadingBtn = false;
            this.errorMsg = data.data;
        }
    });
}

  openModalBox(id = '') {
      if (id) {
          this.modalBoxName = 'Edit';
          this.show(id);
      } else {
          this.modalBoxName = 'Create';
      }
      this.showPopup = true;
  }

  popUpClose() {
      this.showPopup = false;
      this.latestArrivalName  = this.editBannerId = '';
      this.errorMsg = [];
      this.viewBox = false;
  }

  keyPress(event, type, id = '') {
      if (event.keyCode === 13) {
          if (type === 'Create') {
              this.store();
          } else if (type === 'Edit') {
              this.update(id);
          }
      }
  }

  swalCall(id) {
      Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this data!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
      }).then((result) => {
          if (result.value) {
              this.apiCall('destroy', 'latestArrival/' + id);
              Swal.fire(
                  'Deleted!',
                  'Your data has been deleted.',
                  'success'
              );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                  'Cancelled',
                  'Your data is safe.',
                  'error'
              );
          }
      });
  }
}
