import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';

declare const $: any;
declare const UIkit: any;

@Component({
  moduleId: module.id,
  selector: 'app-user-cabiner',
  templateUrl: './user.cabinet.component.html'
})

export class UserCabinetComponent implements OnInit {

  private token: string = localStorage.getItem('auth_token_rent');
  public backendHost: string = 'http://beru.rent/';

  public user: any = null;

  public avatar: any = null;

  public dataForm: any = null;

  ngOnInit() {
    this.getUserInfo();
  }

  constructor(private _userService: UserService,
              private _productService: ProductService){

  }

  public getUserInfo(){
    this._userService.getUserInfo(this.token).subscribe(
      data => {
        this.user = data.json();

        console.log(this.user);
      },
      err => console.log(err)
    )
  }

  public addFiles(event){
    let target = event.target.files;
    this.avatar = target;

    console.log(this.avatar);
  }

  saveUser(event: Event){

    event.preventDefault();

    let output_form = new FormData()

    let files: FileList = this.avatar;

    if(this.avatar){
      for(let i = 0; i < files.length; i++){
        output_form.append('avatar', files[i], files[i].name)
      }
    }

    console.log(this.user)

    output_form.append('jsondata', JSON.stringify(this.user));

    this.dataForm = output_form;

    this._userService.updateUserInfo(this.token, this.dataForm).subscribe(
      data => {
        console.log(data.json())

      },
      err => console.log(err)
    )
  }
}
