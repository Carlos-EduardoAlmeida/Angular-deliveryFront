import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private localStorageKey = 'firstTime';
  private firstTime: boolean;

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {
    this.firstTime = JSON.parse(localStorage.getItem(this.localStorageKey) || 'true');
  }

  hide(): void {
    this.loadingSubject.next(false);
    window.localStorage.setItem('showMessage', 'false');
  }

  private executeOnceAfterDelay(): void {
    timer(20000)
      .pipe(take(1))
      .subscribe(() => {
        window.localStorage.setItem('showMessage', 'true');
      });
  }

  show(): void {
    window.localStorage.setItem('showMessage', 'false');
    this.loadingSubject.next(true);

    if (this.firstTime) {
      this.executeOnceAfterDelay();
      this.firstTime = false;
      localStorage.setItem(this.localStorageKey, 'false');
    }
  }
}