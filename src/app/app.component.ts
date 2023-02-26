import {Component, OnInit, ViewChild} from '@angular/core';
import {DomController, Platform} from "@ionic/angular";


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],

})

export class AppComponent implements OnInit {
    rootPage: string = 'HomePage';


    constructor(private platform: Platform, private domCtrl: DomController) {
    }

    ngOnInit(): void {
        if (this.platform.is('android')) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                console.log('Dark mode is supported and enabled');
                this.domCtrl.write(() => {
                    document.body.classList.remove('light');
                    document.body.classList.add('dark');
                });

            } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                console.log('Light mode is supported and enabled');

                this.domCtrl.write(() => {
                    document.body.classList.remove('dark');
                    document.body.classList.add('light');
                });

            } else {

                console.log('Dark mode is supported but not enabled');
            }
        } else {
            console.log('Dark mode is not supported');
        }

    }


}
