import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const user = await this.authService.checkAuth();
      // const uid = this.authService.getId();
      console.log(user);
      if (!user) {
        return true;
      } else {
        this.navigate("/tabs");
        return false;
      }
    } catch (e) {
      console.log(e);
      this.navigate("/tabs");
      return false;
    }
  }

  navigate(url: any) {
    this.router.navigateByUrl(url, { replaceUrl: true });
  }
}
