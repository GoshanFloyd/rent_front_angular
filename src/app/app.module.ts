import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MainComponent} from './components/main.component/main.component';
import {routing} from './app.routing';
import {UserService} from './services/user.service';
import {ProductService} from './services/product.service';
import {ProductsMyComponent} from './components/products.my.component/products.my.component';
import {ProductsAddComponent} from './components/product.add.component/product.add.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductsMyComponent,
    ProductsAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [
    UserService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
