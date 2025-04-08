import { Routes } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { canDeactivateGuard } from './guards/can-deactivate.guard';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { TableDemoComponent } from './table-demo/table-demo.component';

export const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Home' },
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'child',
        component: ChildComponent,
        canDeactivate: [canDeactivateGuard],
        data: { breadcrumb: 'Child' },
      },
      {
        path: 'parent',
        component: ParentComponent,
        data: { breadcrumb: 'Parent' },
      },
      {
        path: 'product/:id',
        component: ProductComponent,
        data: { breadcrumb: 'Product Details' },
      },
      {
        path: 'feature',
        loadChildren: () =>
          import('./feature/feature.module').then((m) => m.FeatureModule),
      },
      {
        path: 'reactive-form',
        loadComponent: () => 
            import('./reactive-form/reactive-form.component').then(m => m.ReactiveFormComponent),
            data: { breadcrumb: 'Reactive Form' }
      },
      {
        path: 'table-demo',
        component: TableDemoComponent,
        data: { breadcrumb: 'Demo Table'}
      }
    ],
  },
  { path: '**', redirectTo: '' },
];
