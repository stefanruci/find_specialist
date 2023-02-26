import {Injectable} from "@angular/core";
import {
    CanActivate,
} from "@angular/router";
import {AuthService} from "src/app/services/auth/auth.service";
import {RouterService} from "../../services/routerService/router.service";

@Injectable({
    providedIn: "root",
})
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService, private routerService: RouterService) {
    }

    async canActivate(): Promise<boolean> {
        try {
            const user = await this.authService.checkAuth();
            // const uid = this.authService.getId();
            console.log(user);
            if (!user) {
                return true;
            } else {
                await this.routerService.navigate("./tabs/landing-page");

                return false;
            }
        } catch (e) {
            console.log(e);
            await this.routerService.navigate("./tabs/landing-page");
            return false;
        }
    }

}
