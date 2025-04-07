import { Routes } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { canDeactivateGuard } from './guards/can-deactivate.guard';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';

export const routes: Routes = [
    {
        path:'', component: HomeComponent, data: { breadcrumb: 'Home'}
    },
    {
        path: 'parent', component: ParentComponent, data: { breadcrumb: 'Parent'}
    },
    {
        path:'child', component: ChildComponent, canDeactivate: [canDeactivateGuard], data: {breadcrumb: 'Child'}
    },
    {
        path: 'feature',
        loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
    },
    {
        path: 'product/:id', component: ProductComponent, data: { breadcrumb: 'Product Details'}
    }
    
];

