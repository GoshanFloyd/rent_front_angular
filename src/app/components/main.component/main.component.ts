import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import {Router} from '@angular/router';

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

  public formSearchProduct = new FormGroup({
    searchString: new FormControl()
  });

  private token: string;
  public userinfo: string;
  public backendHost: string = 'http://beru.rent/';

  public loginState: boolean = false;
  public products: Array<any> = [];
  public categories: Array<any> = [];

  constructor(private _userService: UserService,
              private _productService: ProductService,
              private router: Router) {

  }

  ngOnInit() {
    this.getToken()
    this.getProducts();
  }

  public getUserInfo(){

    this._userService.getUserInfo(this.token).subscribe(
      data => {
        this.loginState = true;
        this.userinfo = data.json();
        this.getCategories(this.token);
      },
      err => console.log(err)
    )
  }

  public getToken() {

    this.token = localStorage.getItem('auth_token_rent');

    if(this.token){
      this.getUserInfo();
    }

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
                localStorage.setItem('auth_token_rent', data.json().token);
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

  public getProducts(){
    this._productService.getAllProducts().subscribe(
      data => {
          this.products = data.json();

          for(let item of this.products){
            this._userService.getUserInfoById(this.token,item.author).subscribe(
              data => {
                item.author_info = data.json()
              },
              err => console.log(err)
            )
          }
        },
      err => console.log(err)
    )
  }

  public getSingleItem(event: Event, product: any){
    event.preventDefault();

    localStorage.setItem('rent_product_id', product._id);
    this.router.navigate(['/single-item'])
  }

  public onLoginAction(login: boolean){

    this.loginState = login;
  }

  public searchProducts(){
    if(this.formSearchProduct.get('searchString').value.length > 0){
      this._productService.searchProductByName(this.token, this.formSearchProduct.get('searchString').value).subscribe(
        data => {
          this.products = data.json()
        },
        err => console.log(err)
      )
    }
    else{
      this.getProducts();
    }
  }

  public getCategories(token: string){
    this._productService.getDistinctCategory(this.token).subscribe(
      data => {
        this.categories = data.json();
      },
      err => console.log(err)
    )
  }
}
