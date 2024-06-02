import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationComponent } from '../common/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(
    private router : Router,
    private notif : NotificationComponent,
    private userService : UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!localStorage.getItem("userToken")) {
      this.router.navigate(['/home']);
      this.notif.showError("Please login to continue");
      return false;
    }

    const data : any = (async () => await this.validateUser())();
    if(data) return true

    this.router.navigate(['/home']);
    this.notif.showError("Please login to continue");
    return false;
  }

  validateUser = () => {
    return new Promise<Boolean>(resolve => {
      this.userService.validateUser().subscribe(({error, data}) => resolve(data));
    });
  }

}
