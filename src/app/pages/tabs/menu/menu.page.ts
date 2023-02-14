import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "@firebase/util";
import { PopoverController } from "@ionic/angular";
import { map } from "rxjs";
import { User } from "src/app/model/user/user.model";
import { AuthService } from "src/app/services/auth/auth.service";
@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"],
})
export class MenuPage implements OnInit {
  isCollapsed = true;
  @ViewChild("popover") popover: PopoverController;

  name: string = "Afrim";
  constructor(private auth: AuthService, private router: Router) {}

  user: User = {
    id: "",
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    userType: "",
    location: "",
    profilePictureUrl: "",
  };
  ngOnInit() {
    this.auth.getCurrentUser().subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    console.log("this user", this.user);
  }
  async logout() {
    try {
      console.log("logout");

      await this.auth.logout().then((e) => {
        this.router.navigateByUrl("/login", { replaceUrl: true });
      });
      this.popover.dismiss();
      // this.chatService.currentUserId = null;
    } catch (e) {
      console.log(e);
    }
  }
}
