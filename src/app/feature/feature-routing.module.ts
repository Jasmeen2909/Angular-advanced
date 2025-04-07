import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponentComponent } from './feature-component/feature-component.component';

const routes: Routes = [
  { path: '', component: FeatureComponentComponent, data: { breadcrumb: 'Feature' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
