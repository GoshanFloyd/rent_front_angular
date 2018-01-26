import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  private host:string = "http://beru.rent/api/user/";

  constructor(private http: Http) {
  }

  registerUser(data: any) {
    return this.http.post(this.host+'/create', data);
  }

  authUser(data:any) {
    return this.http.post(this.host+'/auth', data)
  }

  getUserInfo(token: string){
    let headers = new Headers();

    headers.append('TOKEN', token)

    return this.http.get(this.host, {headers: headers})
  }

  getUserInfoById(token: string, id: any){
    let headers = new Headers();

    headers.append('TOKEN', token)

    return this.http.get(this.host+id, {headers: headers})
  }

  updateUserInfo(token: string, data: any){
    let headers = new Headers();

    headers.append('TOKEN', token);

    return this.http.put(this.host, data, {headers: headers})
  }
}
