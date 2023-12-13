import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private firstTime = true;

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  hide(): void {
    this.loadingSubject.next(false);
    window.localStorage.setItem('showMessage', 'false')
  }
  
  show(): void {
    window.localStorage.setItem('showMessage', 'false');
    this.loadingSubject.next(true);
    if(this.firstTime == true){ 
      const contador = interval(20000)
      contador.subscribe({
        next: () => {
          window.localStorage.setItem('showMessage', 'true')
        }
      })
    }
  }
}
