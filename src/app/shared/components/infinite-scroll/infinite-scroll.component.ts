import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

@Component({
  selector: "app-infinite-scroll",
  templateUrl: "./infinite-scroll.component.html",
  styleUrls: ["./infinite-scroll.component.scss"],
  animations: [
    trigger("fadeInOut", [
      state("in", style({ opacity: 1 })),
      transition("void => *", [
        style({ opacity: 0 }),
        animate(300), // Adjust the duration as needed (300ms in this example)
      ]),
      transition("* => void", [
        animate(300, style({ opacity: 0 })), // Adjust the duration as needed (300ms in this example)
      ]),
    ]),
  ],
})
export class InfiniteScrollComponent implements OnInit, OnChanges {
  @Input() searchResults = [];

  private prevScrollPosition = 0;

  @Output() branchEvent = new EventEmitter<{
    branchid: string;
    branch_name: string;
  }>();

  @Output() scrollEvent = new EventEmitter();

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.searchResults.length > 0) {
      this.filteredResults = [...this.searchResults];
    } else {
      this.filteredResults = [];
    }
  }

  // @HostListener("scroll", ["$event"])
  onScroll(event: Event) {
    const myDropdown = this.el.nativeElement.querySelector("#myDropdown");
    const dropdownlist = this.el.nativeElement.querySelector("#dropdownlist");

    const scrollPosition = myDropdown?.scrollTop + dropdownlist?.offsetHeight;

    if (scrollPosition > this.prevScrollPosition) {
      // Scrolling down
      if (scrollPosition > 415) {
        this.scrollEvent.next();
      }
    }
    // else {
    //   // Scrolling up
    //   if (divElement.scrollTop < 80) {
    //     this.loadMoreResults();
    //   }
    // }

    this.prevScrollPosition = scrollPosition;
  }

  branchSelect(branchid: string, branch_name: string) {
    this.searchResults = this.filteredResults = [];
    this.branchEvent.next({ branchid, branch_name });
    this.cdr.detectChanges();
  }

  searchTerm: string;
  filteredResults: any[];

  filterResults() {
    console.log(this.searchTerm);
    if (!this.searchTerm) {
      this.searchResults = this.filteredResults;
      return;
    }

    this.searchResults = this.filteredResults.filter((branch) =>
      branch.branch_name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
