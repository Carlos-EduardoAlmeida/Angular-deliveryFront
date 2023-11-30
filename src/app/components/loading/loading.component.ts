import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { interval } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements DoCheck{
  showMessage = false;

  constructor(
    public loadingService: LoadingService
  ) { }
  ngDoCheck(): void {
    if(localStorage.getItem('showMessage') == 'true'){
      this.showMessage = true;
    } else if(localStorage.getItem('showMessage') == 'false'){
      this.showMessage = false;
    }
  }
}
