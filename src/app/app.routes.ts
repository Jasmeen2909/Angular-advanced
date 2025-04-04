import { Routes } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { canDeactivateGuard } from './guards/can-deactivate.guard';

export const routes: Routes = [
    {
        path: '', component: ParentComponent
    },
    {
        path:'child', component: ChildComponent, canDeactivate: [canDeactivateGuard]
    },
    {
        path: 'feature',
        loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
    },
    
];
