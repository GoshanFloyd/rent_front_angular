import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';

declare const $: any;
declare const UIkit: any;

@Component({
  moduleId: module.id,
  selector: 'app-products-my',
  templateUrl: './products.my.component.html'
})

export class ProductsMyComponent implements OnInit {

  private token: string = localStorage.getItem('auth_token_rent');
  public backendHost: string = 'http://beru.rent/';

  public products: Array<any> = [];

  ngOnInit() {
    this.getProducts(this.token);
  }

  constructor(private _userService: UserService,
              private _productService: ProductService){

  }

  public getProducts(token: string){
    this._productService.getMyProducts(this.token).subscribe(
      data => {
        this.products = data.json();

        console.log(this.products)

        for(let product of this.products){

        }
      },
      err => console.log(err)
    )
  }
}
