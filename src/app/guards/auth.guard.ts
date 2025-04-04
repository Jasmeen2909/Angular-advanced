import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, GuardResult, MaybeAsync } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate( 
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean{
    const isAuthenticated = false;
    if(isAuthenticated){
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
