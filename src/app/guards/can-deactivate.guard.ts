import { ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from './can-component-deactivate.interface';

@Injectable({
  providedIn: 'root'
})

export class canDeactivateGuard implements CanDeactivate<CanComponentDeactivate>{
  canDeactivate(
    component: CanComponentDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
