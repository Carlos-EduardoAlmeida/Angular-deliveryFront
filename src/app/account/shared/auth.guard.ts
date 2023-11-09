import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const authGuard: CanActivateFn = (route, state): boolean => {
  const token = window.localStorage.getItem('token');

  if(token){
    return true;
  }else{
    inject(Router).navigate(['login'])
    return true;
  }
};
