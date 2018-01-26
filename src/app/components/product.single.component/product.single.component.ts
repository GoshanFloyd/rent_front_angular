import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';

declare const $: any;
declare const UIkit: any;

@Component({
  moduleId: module.id,
  selector: 'app-product-single',
  templateUrl: './product.single.component.html'
})

export class ProductSingleComponent implements OnInit {

  private token:string = localStorage.getItem('auth_token_rent');
  private product_id:string = localStorage.getItem('rent_product_id');

  public currentProduct: any = null;
  public backendHost: string = 'http://beru.rent/';
  public author: any = null;

  public calendar:any;

  public stateValue = {
    'good': 'Хорошее',
    'satisfactory': 'Удовлетворительное'
  };

  public sum:number = null;
  public dates: Array<any> = [];

  constructor(private _userService: UserService,
              private _productService: ProductService){
    }

  ngOnInit() {
    this.getProductItem(this.token, this.product_id);
  }

  public getAuthor(){
    this._userService.getUserInfoById(this.token, this.currentProduct.author).subscribe(
      data => {
        this.author = data.json();
      },
      err => console.log(err)
    )
  }

  public initCalendar(){
    const today = new Date();
    this.calendar = $('#dates').multiDatesPicker({
      minDate: 1,
      maxDate: 30,
    });
    console.log(this.calendar)
  }

  public getProductItem(token: string, id: string){
    this._productService.getSingleProduct(token, id).subscribe(
      data => {
        this.currentProduct = data.json();
        this.initCalendar();
        this.getAuthor();
      },
      err => console.log(err)
    )
  }

  public calcSum(){
    this.dates = $('#dates').multiDatesPicker('getDates');

    this.sum = this.currentProduct.price * this.dates.length;

    console.log(this.sum)
  }

  public rentProduct(){

  }
}
