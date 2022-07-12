import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
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
  id:any = this.route.snapshot.paramMap.get('id');
  constructor(private apiService: ApiService, private toastr: ToastrService,
    private route: ActivatedRoute) {
        
     
     }

  ngOnInit() {
    
    this.getData();
  }



  getData(){
    this.loading = true;
    this.apiService.getData('getTestimonyById', this.id).subscribe((data) => {
      const value = data.data;     
      this.id = value.id
      this.content = value.content;
      this.image = value.user_image;
      this.name = value.user_name;
      this.role = value.user_role;
      this.reviewStar = value.review_star_count;
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

}
