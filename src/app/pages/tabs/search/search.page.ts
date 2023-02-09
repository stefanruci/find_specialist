import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage implements OnInit {
  @Input() searchWord: String = "";
  segment: string;
  constructor() {}

  ngOnInit() {}
  onSearch() {
    console.log("onSearch() works " + this.searchWord);
  }

  onSegmentChanged(event: any) {
    console.log(event);
    this.segment = event.detail.value;
  }
}
