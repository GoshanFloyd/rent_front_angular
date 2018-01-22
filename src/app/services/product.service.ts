import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  private host:string = "http://localhost:8200/api/product/";

  constructor(private http: Http) {
  }

  getAllProducts(token: any) {

    let headers = new Headers();

    headers.append('TOKEN', token)

    return this.http.get(this.host+'/all', {headers: headers});
  }

  addProduct(token: string, data: any){

    let headers = new Headers();

    headers.append('TOKEN', token);

    return this.http.post(this.host, data, {headers:headers});
  }
}
