import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../model/user/user.model";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
    selector: 'app-all-feeds',
    templateUrl: './all-feeds.page.html',
    styleUrls: ['./all-feeds.page.scss'],
})
export class AllFeedsPage implements OnInit {
    @Input() userType: string = "";

    validUserType: boolean = true;


    @Input()
    userId: string = "";
    private currentUser: User;

    constructor(private route: ActivatedRoute, private authService: AuthService) {

    }

    ngOnInit() {
        this.userType = this.route.snapshot.paramMap.get('user-type');

        if (this.userType.length > 0 && this.userType == "F" || this.userType == "P") {
            if (this.authService.isLogin == true) {
                this.authService.getCurrentUser().subscribe(
                    (user) => {
                        this.currentUser = user.data();
                        this.userId = user.data().id;
                    }, error => {
                        console.error(error);
                    }, () => {
                        console.log(this.currentUser, "loading page on allFeeds")

                    });
                setTimeout(()=>{
                    this.validUserType = true

                },2000)

            } else {
                this.validUserType = true

            }


        } else {

            this.validUserType = false

        }


    }


}
