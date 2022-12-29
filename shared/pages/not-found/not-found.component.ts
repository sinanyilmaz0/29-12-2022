import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.redirect();
  }

  redirect(): void {
    this.router.navigate(['/404notfound']);
  }
}
