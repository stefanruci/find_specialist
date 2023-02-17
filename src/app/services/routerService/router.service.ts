import {Injectable} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class RouterService {

    constructor(private router: Router) {
    }

    navigate(url: any) {
        return this.router.navigateByUrl(url, {replaceUrl: true}).then(r => {
        }).catch(error => {
        });

    }

    navigateWithData(param: (string | any)[], navData: NavigationExtras) {
        return this.router.navigate(param, navData).then(r => {
        }).catch(error => {
        });

    }
}
