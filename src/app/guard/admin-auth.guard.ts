import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationComponent } from '../common/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate, CanActivateChild {

  constructor(private router : Router, private notif : NotificationComponent, private userService : UserService) {}

   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // const data : any = (async () => await this.validateAdminUser())();
      
      // if(data == true) return true

      // this.router.navigate(['/admin']);
      // this.notif.showError("Please login to continue");
      // return false;
      return new Promise(async (resolve, reject) => {
        const data : any = await this.validateAdminUser();
        if(data) return resolve(true);

        this.router.navigate(['/admin']);
        this.notif.showError("Please login to continue");
        return resolve(false);
      });
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const data : any = (async () => await this.validateAdminUser())();
      if(data) return true

      this.router.navigate(['/admin']);
      this.notif.showError("Please login to continue");
      return false;
  }

  validateAdminUser = () => {
    return new Promise<Boolean>(resolve => {
      // if()
      this.userService.validateAdmin().subscribe(({error, data}) => resolve(data));
      // resolve(true);
    });
  }

}
