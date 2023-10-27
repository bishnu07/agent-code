import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { NgbDropdown, NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-custom-dropdown",
  templateUrl: "./custom-dropdown.component.html",
  styleUrls: ["./custom-dropdown.component.scss"],
})
export class CustomDropdownComponent implements OnInit {
  // @Input() menuItems = [];
  // Inject NgbDropdownConfig to configure the behavior of ngbDropdown
  // Declare a variable to track submenu open state
  isSubmenuOpen = true;

  constructor(public config: NgbDropdownConfig) {
    config.autoClose = "outside";
    config.placement = "right";
  }

  @ViewChild(NgbDropdown) dropdown: NgbDropdown;

  @ViewChild("dpMenu") dpMenu: ElementRef;
  isDropdownOpen = false;

  menuItems = [
    {
      name: "ACTUS contract JSON",
      children: null, // No sub-menu for this item
    },
    {
      name: "SolitX product JSON",
      children: null,
    },
    {
      name: "Document format",
      children: [
        {
          name: "Submenu Item 1",
          children: null,
        },
        {
          name: "Submenu Item 2",
          children: null,
        },
      ],
    },
    {
      name: "Export Blockly XML",
      children: null,
    },
  ];

  ngOnInit(): void {}

  toggleDropdown() {
    return (this.isDropdownOpen = !this.isDropdownOpen);
  }

  toggleSubMenu(item) {
    item.isOpen = !item.isOpen;
  }

  // Function to handle mouse enter event
  onMouseEnter(event: Event) {
    // this.isSubmenuOpen = true;
    this.config.placement = "right";
    this.dpMenu.nativeElement.style.left = "100% !important";
  }

  // Function to handle menu item click event
  onMenuItemClick(event: Event) {
    // Prevent click event from propagating to parent elements
    event.stopPropagation();
    this.dpMenu.nativeElement.style.left = "100% !important";
    // Close the submenu
    // this.isSubmenuOpen = false;
    this.config.placement = "right";
  }
}
