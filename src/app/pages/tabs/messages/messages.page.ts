import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ModalController, PopoverController } from "@ionic/angular";
import { Observable, take } from "rxjs";
import { LoginComponent } from "src/app/components/login/login.component";
import { ChatService } from "src/app/services/chat/chat.service";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.page.html",
  styleUrls: ["./messages.page.scss"],
})
export class MessagesPage implements OnInit {
  isCollapsed: boolean = true;

  @ViewChild("popover") popover: PopoverController;
  segment = "chats";
  open_new_chat = false;
  users: Observable<any[]>;
  chatRooms: Observable<any[]>;
  model = {
    icon: "chatbubbles-outline",
    title: "No Chat Rooms",
    color: "danger",
  };

  isLogin: boolean = false;

  constructor(
    private router: Router,
    public chatService: ChatService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getRooms();
    this.isLogin = this.chatService.auth.isLogin;
  }
  async openLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      cssClass: "modal-large",
    });
    return await modal.present();
  }
  getRooms() {
    // this.chatService.getId();
    // this.chatService.getChatRooms();
    this.chatRooms = this.chatService.chatRooms;
    console.log("chatrooms: ", this.chatRooms);
  }

  async logout() {
    try {
      console.log("logout");
      this.popover.dismiss();
      await this.chatService.auth.logout().then((e) => {
        this.router.navigateByUrl("/login", { replaceUrl: true });
      });
      // this.chatService.currentUserId = null;
    } catch (e) {
      console.log(e);
    }
  }

  onSegmentChanged(event: any) {
    console.log(event);
    this.segment = event.detail.value;
  }

  newChat() {
    this.open_new_chat = true;
    if (!this.users) this.getUsers();
  }

  getUsers() {
    // this.chatService.getUsers();
    this.users = this.chatService.users;
  }

  onWillDismiss(event: any) {}

  // async startChat(item) {
  //   try {
  //     // this.global.showLoader();
  //     // create chatroom
  //     const room = await this.chatService.createChatRoom(item?.uid);
  //     console.log("room: ", room);
  //     const navData: NavigationExtras = {
  //       queryParams: {
  //         name: item?.name,
  //       },
  //     };
  //     this.router.navigate(["/", "home", "chats", room?.id], navData);
  //     // this.global.hideLoader();
  //   } catch (e) {
  //     console.log(e);
  //     // this.global.hideLoader();
  //   }
  // }

  getChat(item) {
    (item?.user).pipe(take(1)).subscribe((user_data) => {
      console.log("data: ", user_data);
      const navData: NavigationExtras = {
        queryParams: {
          name: user_data?.name,
        },
      };
      this.router.navigate(["/", "home", "chats", item?.id], navData);
    });
  }

  getUser(user: any) {
    return user;
  }
}
