import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.sidebarActiveBtn();
  }

  sidebarActiveBtn(): void {
    let sidebarMenuItems =
      this.element.nativeElement.querySelectorAll('.sidebar-dark-btn');
    sidebarMenuItems.forEach((menuItem: any) => {
      menuItem.addEventListener('click', (e: any) => {
        if (e.target.parentElement.className == 'sidebar-dark-btn') {
          sidebarMenuItems.forEach((menuItemRemove: any) => {
            return menuItemRemove.classList.remove('active');
          });
          e.target.parentElement.classList.add('active');
        }
      });
    });
  }
}
