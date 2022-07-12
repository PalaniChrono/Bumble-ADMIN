import { Component, OnInit ,ElementRef ,ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  title = 'app';  

  @ViewChild('vv',{ static :false}) vv:ElementRef;  
  testimonialContent:any=""
  userimage : any = ""
  username : any = ""
  userrole : any = ""
  userstar : any = ""
  loading: boolean;
  content: any;
  image: any;
  name: any;
  role: any;
  reviewStar: any;
  loadingBtn = false;
  viewBox = false;
  orderDetails : any = ''
  perosndetails :any =''
  p = 1;


  id:any = this.route.snapshot.paramMap.get('id');
  constructor(private apiService: ApiService, private toastr: ToastrService,
    private route: ActivatedRoute) {
        
     
     }

  ngOnInit() {
    
    this.getData();
  }


  getData(){
    this.loading = true;
    this.apiService.getData('getbookusById', this.id).subscribe((data) => {
      this.orderDetails = data.data.extradetails;
      this.perosndetails = data.data.perosndetails;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
  }
  update(){
    this.apiCall('update', 'updateTestimony');
  }
  apiCall(name, url, value: any = '') {
    value = {
      id : this.id,
      content : this.content,
      review_star_count : this.reviewStar,
      user_name : this.name,
      user_role : this.role
    }  
  console.log(value);
    this.apiService[name](url, value).subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
        } else {
            this.toastr.error(data.message);
            
            
        }
        this.getData();
    });
  }
  public openPDF(): void {
    let DATA: any = document.getElementById('eventreports');
   
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 190;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 10;
      PDF.addImage(FILEURI, 'PNG', 10, position, fileWidth, fileHeight);
      PDF.save('event_details');
    });
  }

}

