import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  private host:string = "http://beru.rent/api/product";

  constructor(private http: Http) {
  }

  getAllProducts() {
    return this.http.get(this.host+'/all');
  }

  getMyProducts(token: string){

    let headers = new Headers();

    headers.append('TOKEN', token);

    return this.http.get(this.host,{headers:headers});
  }

  addProduct(token: string, data: any){

    let headers = new Headers();

    headers.append('TOKEN', token);

    return this.http.post(this.host, data, {headers:headers});
  }

  getSingleProduct(token: string, id: string){
    let headers = new Headers();

    headers.append('TOKEN', token);

    return this.http.get(this.host+'/'+id, {headers:headers});
  }

  searchProductByName(token: string, str: string){
    let headers = new Headers();

    headers.append('TOKEN', token);

    return this.http.get(this.host+'/find/'+str, {headers:headers});
  }

  getDistinctCategory(token: string){
    let headers = new Headers();

    headers.append('TOKEN', token);

    return this.http.get(this.host+'/category/', {headers:headers});
  }
}
