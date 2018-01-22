import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';

declare const $: any;
declare const UIkit: any;

@Component({
  moduleId: module.id,
  selector: 'app-main',
  templateUrl: './main.component.html'
})

export class MainComponent implements OnInit {

  public formRegisterUser = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    nickname: new FormControl(),
    phone: new FormControl()
  })

  private token: string = '';
  public userinfo: string;
  public backendHost: string = 'http://localhost:8200/';

  public loginState: boolean = false;
  public products: Array<any> = [];

  constructor(private _userService: UserService,
              private _productService: ProductService) {

  }

  ngOnInit() {
    this.getToken()
  }

  public getUserInfo(){

    this._userService.getUserInfo(this.token).subscribe(
      data => {
        this.loginState = true;
        this.userinfo = data.json();
        this.getProducts(this.token);
      },
      err => console.log(err)
    )
  }

  public getToken() {

    this.token = localStorage.getItem('auth_token');

    this.getUserInfo();
  }


  public registerUser(event: Event){
    const user = {
      username: this.formRegisterUser.get('username').value,
      password: this.formRegisterUser.get('password').value,
      phone: this.formRegisterUser.get('phone').value,
      nickname: this.formRegisterUser.get('nickname').value
    }

    this._userService.registerUser(user).subscribe(
      data => {
        if (data.json().user){
          this._userService.authUser({
            username:data.json().user.username,
            password:data.json().user.password
          }).subscribe(
            data => {
              if(data.json().token){
                const modal = UIkit.modal('#sign-up-modal');
                modal.hide();
                localStorage.setItem('auth_token', data.json().token);
                this.getToken();
              }

            },
            err => console.log(err)
          )
        }
      },
      err => console.log(err)
    )
  }

  public getProducts(token: string){
    this._productService.getAllProducts(token).subscribe(
      data => {
          this.products = data.json();
          console.log(this.products)
        },
      err => console.log(err)
    )
  }

}
