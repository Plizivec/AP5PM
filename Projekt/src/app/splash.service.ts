import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SplashService {
  private splashVisible = new BehaviorSubject<boolean>(true);

  get splashVisibility() {
    return this.splashVisible.asObservable();
  }

  hideSplash() {
    this.splashVisible.next(false);
  }
}
