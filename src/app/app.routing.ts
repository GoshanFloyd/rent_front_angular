import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main.component/main.component';
import {ProductsMyComponent} from './components/products.my.component/products.my.component';
import {ProductsAddComponent} from './components/product.add.component/product.add.component';

const appRoutes: Routes = [
  {path: '', component: MainComponent },
  {path: 'my-stuff', component: ProductsMyComponent},
  {path: 'add-item', component: ProductsAddComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
