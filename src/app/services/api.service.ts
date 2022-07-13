import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

let head = new HttpHeaders();
let headers = head.set('Accept', 'application/json');
@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiURL = 'http://localhost:8000/api';
    // apiURL = 'http://192.168.0.22:8001/api';
    // apiURL = 'https://bumbleapi.chronoinfotech.com/api';

    constructor(private http: HttpClient) { }

    private getToken() {
        headers = head.set('Authorization', `Bearer ${localStorage.getItem('user_token')}`);
    }

    public getData(url, params: any = '') {
        this.getToken();
        if (params) {
            return this.http.get<any>(`${this.apiURL}/` + url + `/` + params, { headers });
        }
        return this.http.get<any>(`${this.apiURL}/` + url, { headers });
    }

    public postData(data, url) {
        this.getToken();
        return this.http.post<any>(`${this.apiURL}/` + url, data, { headers });
    }

    public searchData(url, params: any = '') {
        this.getToken();
        params = params === '' ? null : params;
        return this.http.get<any>(`${this.apiURL}/` + url + `/` + params, { headers });
    }

    public index(params) {
        this.getToken();
        return this.http.get<any>(`${this.apiURL}/` + params, { headers });
    }

    public store(params, data) {
        return this.http.post<any>(`${this.apiURL}/` + params, data, { headers });
    }

    public show(params) {
        return this.http.get<any>(`${this.apiURL}/` + params, { headers });
    }

    public update(params, data) {
        return this.http.post<any>(`${this.apiURL}/` + params + '?_method=PUT', data, { headers });
    }

    public destroy(params) {
        return this.http.delete<any>(`${this.apiURL}/` + params, { headers });
    }

}
