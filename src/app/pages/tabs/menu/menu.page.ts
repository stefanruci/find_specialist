import { Component, OnInit, ViewChild } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"],
})
export class MenuPage implements OnInit {
  @ViewChild("popover") popover: PopoverController;

  constructor() {}

  ngOnInit() {}
  logout() {}
}
