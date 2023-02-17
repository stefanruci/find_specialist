import {Injectable} from "@angular/core";
import {CanActivate, CanLoad, Router} from "@angular/router";
import {AuthService} from "src/app/services/auth/auth.service";
import {RouterService} from "../../services/routerService/router.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private routerService: RouterService) {
    }

    async canActivate(): Promise<boolean> {
        try {
            const user = await this.authService.checkAuth();
            // const uid = this.authService.getId();
            console.log(user);
            if (user) {
                return true;
            } else {
                this.routerService.navigate("/login");
                return false;
            }
        } catch (e) {
            console.log(e);
            this.routerService.navigate("/login");
            return false;
        }
    }


}
