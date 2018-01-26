import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main.component/main.component';
import {ProductsMyComponent} from './components/products.my.component/products.my.component';
import {ProductsAddComponent} from './components/product.add.component/product.add.component';
import {ProductSingleComponent} from './components/product.single.component/product.single.component';
import {LoginGuard} from './guards/login.guard';
import {UserCabinetComponent} from './components/user.cabiner/user.cabinet.component';

const appRoutes: Routes = [
  {path: '', component: MainComponent },
  {path: 'my-stuff', component: ProductsMyComponent, canActivate: [LoginGuard]},
  {path: 'add-item', component: ProductsAddComponent, canActivate: [LoginGuard]},
  {path: 'single-item', component: ProductSingleComponent, canActivate: [LoginGuard]},
  {path: 'cabinet', component: UserCabinetComponent, canActivate: [LoginGuard]}
];

export const routing = RouterModule.forRoot(appRoutes);
