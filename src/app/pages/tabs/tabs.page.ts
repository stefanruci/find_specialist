import {Component, OnInit, ViewChild} from '@angular/core';
import {IonRouterOutlet} from "@ionic/angular";
import {ActivationStart, Router, RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
    @ViewChild(IonRouterOutlet) outlet: IonRouterOutlet;
    @ViewChild(RouterOutlet) ngoOutlet: RouterOutlet;

    constructor(private router: Router
    ) {
    }

    ngOnInit() {
        this.router.events.subscribe(e => {
            if (e instanceof ActivationStart && e.snapshot.outlet === "administration")
                this.outlet.deactivate();
        });

        this.router.events.subscribe(e => {
            if (e instanceof ActivationStart && e.snapshot.outlet === "administration")
                this.ngoOutlet.deactivate();
        });

    }

}
