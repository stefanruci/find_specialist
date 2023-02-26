import {Injectable, ViewChild} from '@angular/core';
import {ActivationStart, NavigationExtras, Router, RouterOutlet} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class RouterService {

    constructor(
        private router: Router
    ) {
    }

    @ViewChild(RouterOutlet) outlet: RouterOutlet;

    navigate(url: any) {
        this.router.events.subscribe(e => {
            if (e instanceof ActivationStart && e.snapshot.outlet === "administration")
                this.outlet.deactivate();
        });
        return this.router.navigateByUrl(url, {replaceUrl: true}).then(r => {
        }).catch(error => {
        });

    }

    navigateWithData(param: (string | any)[], navData: NavigationExtras) {
        this.router.events.subscribe(e => {
            if (e instanceof ActivationStart && e.snapshot.outlet === "administration")
                this.outlet.deactivate();
        });
        return this.router.navigate(param, navData).then(r => {
        }).catch(error => {
        });

    }
}
