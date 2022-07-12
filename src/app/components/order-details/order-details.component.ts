import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  private album: any = [];
  private orderImage:any = [];
  searchField: FormControl = new FormControl();
  orderDetails: any = [];
  p = 1;
  imageURL;
  trackId = '';
  loading: boolean;
  cityName;
  regionId;
  pincodeList: any;   
  locationDetailsId = 0;
  orderId;
  driverId = 0;
  orderStatus: any;
  pushToDispatch: any;
  getDispatchOrderId:any= [];
  getDriverOrderId:any = [];
  orderStatusName;
  dispatch_order_id;
  dispatchImagesList:any = [];
  cakeDoneImages;
  onlineTeamAccept;
  driverList:any = [];
  driver_order_id;
  dispatchOrderStatus:any;
  

  
  constructor(private apiService: ApiService, private toastr: ToastrService,
    private route: ActivatedRoute,
    private imageService: ImageService, private _lightbox: Lightbox) {
        
     
     }
     open(type: String,index: number): void {
      // open lightbox
      if(type == "ORDER"){
        this._lightbox.open(this.orderImage, index);
      }else if(type == "DISPATCH"){
        this._lightbox.open(this.album, index);
      }
    }
  
    close(): void {
      // close lightbox programmatically
      this._lightbox.close();
    }
  ngOnInit() {
    this.getOrderDetails();
    this.getDispatchOrderByOrderId();
   
    this.getDriverOrderByOrderId();
  
    this.imageURL = this.imageService.getMinImageurl();
  }

  onChange(event){
    this.locationDetailsId = event;
   }

   getAllDriverList(){
    this.loading = true;
    this.apiService.getData('getAllDriverListByLocationId', this.locationDetailsId).subscribe((data) => {
        this.driverList = data.data;
        
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

  getAllLocationDetailsByRegionId(){
    this.loading = true;
    this.apiService.getData('getAllLocationDetailsByRegionId', this.regionId).subscribe((data) => {
        this.pincodeList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
    
  }

  getDispatchOrderByOrderId(){
    this.loading = true;
    this.apiService.getData('getDispatchOrderByOrderId', this.route.snapshot.paramMap.get('id')).subscribe((data) => {
        this.getDispatchOrderId = data.data;
         this.dispatchOrderStatus = data.data[0].dispatch_order_status;
        if(this.getDispatchOrderId.length != 0){
          this.dispatch_order_id = data.data[0].dispatch_order_id;
         
          this.getDispatchImagesById();
        }
        this.loading = false;
    }, error => {
        this.loading = false;
    });
  }

  getDriverOrderByOrderId(){
    this.loading = true;
    this.apiService.getData('getDriverOrderByOrderId', this.route.snapshot.paramMap.get('id')).subscribe((data) => {
        this.getDriverOrderId = data.data;
        if(this.getDriverOrderId.length != 0){
        this.driver_order_id = data.data[0].dispatch_order_id;
        this.getDispatchImagesById();
        }
        // console.log(this.getDriverOrderId.length);
       
        this.loading = false;
    }, error => {
        this.loading = false;
    });
  }

  getDispatchImagesById(){
    this.loading = true;
    this.apiService.getData('getDispatchImagesById', this.dispatch_order_id).subscribe((data) => {
      this.dispatchImagesList = data.data;
      this.dispatchImagesList.forEach(element => {
        const src = element.image;
        const caption = '';
        const thumb = element.image;
          const album = {
             src: src,
             caption: caption,
             thumb: thumb
          };
    
          this.album.push(album)

      });
        this.loading = false;
    }, error => {
        this.loading = false;
    });
  }

  approveImage(dispatch_prepare_image_id="", dispatch_order_id=""){

    const value = {
      dispatch_prepare_image_id: dispatch_prepare_image_id,
      dispatch_order_id:dispatch_order_id
  };
 
  this.apiService.postData(value, 'approveImage').subscribe(data => {
     
    this
    if (data.error === false) {
        this.toastr.success(data.message);
        this.getDispatchImagesById();
        this.getOrderDetails();
        
    } else {
        this.toastr.warning(data.message);
        this.loading = false;
        
    }
    }, error => {
    this.loading = false;
    });
   

  }

  disApproveImage(dispatch_prepare_image_id="", dispatch_order_id=""){

    const value = {
      dispatch_prepare_image_id: dispatch_prepare_image_id,
      dispatch_order_id:dispatch_order_id
  };
 
  this.apiService.postData(value, 'disApproveImage').subscribe(data => {
    if (data.error === false) {
        this.toastr.success(data.message);
        this.getDispatchImagesById();
    } else {
        this.toastr.warning(data.message);
        this.loading = false;
        
    }
    }, error => {
    this.loading = false;
    });

  }

  onPushDispatch(){
    this.loading = true;

    const param = {
      location_details_id: this.locationDetailsId,
      order_id:this.orderId
    }

    this.apiService.postData(param, 'createDispatchOrder').subscribe((data) => {
      if (data.error === false) {
          this.toastr.success(data.message);
          this.getOrderDetails();
          this.getDispatchOrderByOrderId();
          this.loading = false;
      } else {
          this.toastr.warning(data.message);
          this.loading = false;
      }
  }, error => {
      this.loading = false;
  });
  }

  onPushDriver(){
    this.loading = true;

    const param = {
      location_details_id: this.locationDetailsId,
      order_id:this.orderId,
      driver_id: this.driverId
    }

    this.apiService.postData(param, 'createDriverOrder').subscribe((data) => {
      if (data.error === false) {
          this.toastr.success(data.message);
          this.getOrderDetails();
          this.getDispatchOrderByOrderId();
          this.getDriverOrderByOrderId();
          this.loading = false;
      } else {
          this.toastr.warning(data.message);
          this.loading = false;
      }
  }, error => {
      this.loading = false;
  });
  }

  

  getOrderDetails() {
    this.loading = true;
    this.apiService.getData('getOrderDetails', this.route.snapshot.paramMap.get('id')).subscribe((data) => {
      this.orderDetails = data.data;
      
     this.cityName = data.data.region.city.name;
      this.regionId = data.data.region_id;
      this.orderId = data.data.order_id;
      this.orderStatus= data.data.order_status;
      this.orderDetails.ordered_products.forEach(element => {
        const src = element.product_details[0].images[0].product_image;
        const caption = '';
        const thumb = element.product_details[0].images[0].product_image;
          const album = {
             src: src,
             caption: caption,
             thumb: thumb
          };
    
          this.orderImage.push(album)
      });

      if(data.data.dispatch_orders){
        this.cakeDoneImages = data.data.dispatch_orders.cake_done_image;
        this.onlineTeamAccept = data.data.dispatch_orders.online_team_accept;
        this.locationDetailsId = data.data.dispatch_orders.location_details_id;
        this.getAllDriverList();
      }
     
      
      if(this.orderStatus == 'Submitted'){
        this.orderStatusName = 'Submitted';
      }else if(this.orderStatus == 'Confirmed'){
        this.orderStatusName = 'Confirmed';
      }else if(this.orderStatus == 'Dispatched'){
        this.orderStatusName = 'Dispatched';
      }else if(this.orderStatus == 'ReadyToDelivered'){
        this.orderStatusName = 'ReadyToDelivered';
      }else if(this.orderStatus == 'Delivered'){
        this.orderStatusName = 'Delivered';
      }

      console.log(this.orderStatusName);
   
      this.pushToDispatch = data.data.push_to_dispatch;
      
     
      if (this.orderDetails.order_tracking_id) {
        this.trackId = this.orderDetails.order_tracking_id;
      }
      this.getAllLocationDetailsByRegionId();
      this.loading = false;
    }, error => {
      this.loading = false;
    });
   
  }

  goBack() {
    window.history.back();
  }
 
  updateStatus(){
    this.apiService.getData('orderStatusUpdate', `${this.orderId}/${this.orderStatusName}`).subscribe((data) => {
      if (data.error === false) {
          this.toastr.success(data.message);
          this.getOrderDetails();
      } else {
          this.toastr.error(data.message);
      }
      });
  }
  onChangeStatus(event){
    this.orderStatusName = event;
    console.log("orderstatus_sundar",this.orderStatusName)
  }

  onChangeDriver(event){
    this.driverId = event;

    console.log(this.driverId);
  }

  orderTrackingUpdate(id) {
    this.apiService.getData('orderTrackingUpdate', `${id}/${this.trackId}`).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.getOrderDetails();
      } else {
        this.toastr.error(data.message);
      }
    });
  }

  
}
