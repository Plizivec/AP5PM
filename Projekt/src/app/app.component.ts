import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showSplash = true;

  constructor(private router: Router) {
    setTimeout(() => {
      this.showSplash = false;
      this.router.navigate(['/home']); // Replace with your home route
    }, 3000);
  }
}