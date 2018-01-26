import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import {Router} from '@angular/router';

declare const $: any;
declare const UIkit: any;

@Component({
  moduleId: module.id,
  selector: 'app-product-add',
  templateUrl: './product.add.component.html'
})

export class ProductsAddComponent implements OnInit {

  private token: string = localStorage.getItem('auth_token_rent');

  public formAddItem: any = {
    title: '',
    category: null,
    description: '',
    price: 0,
    price_buy: 0,
    state: 'good',
    rent_terms: '',
    period_rent: 'day',
    city_rent: 'Алматы',
    area_rent: 'Медеуский',
    delivery_rent: 'Самовывоз'
  };

  public dataForm: any;

  public files: any;

  constructor(private _productService: ProductService,
              private _router: Router){

  }

  ngOnInit() {}

  public addFiles(event){
    let target = event.target.files;
    this.files = target;
  }

  public addItem(event: Event){

    let output_form = new FormData()

    let files: FileList = this.files;

    if(this.files && files.length > 0){
      for(let i = 0; i < files.length; i++){
        output_form.append('photos', files[i], files[i].name)
      }
    }

    output_form.append('jsondata', JSON.stringify(this.formAddItem));

    this.dataForm = output_form;

    this._productService.addProduct(this.token, this.dataForm).subscribe(
      data => {
        console.log(data.json())

        this._router.navigate(['/'])
      },
      err => console.log(err)
    )
  }
}
