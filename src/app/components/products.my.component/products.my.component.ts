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
  ngOnInit() {

  }
}
