import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, Subject, Observable, of } from 'rxjs';

import { DataItem } from 'app/model';
import { DataService } from 'app/services/data';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  loading = false; // 20210529 WV whether or not loading indicator is visible
  items$: Observable<DataItem[]>;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loading = true; // 20210529 WV show loading indicator
    this.items$ = this.route.queryParams.pipe(
      // TODO implement filter here
      switchMap(() => this.dataService.listItems()
        .pipe( // 20210529 WV tapped completion of the listItems
          tap(() => this.loading = false), // clear the loading indicator
        )
      ),
      catchError(err => { // 20210529 WV catch possible error in listItems
        console.error('myError', err); // clear the loading indicator
        setTimeout(() => this.loading = false, 0); // necessary to wrap in timeout() to avoid 'Expression changed after checked' error
        return []; // return empty stream
      }),
    );
  }

  onSelectItem(id: number) {
    this.router.navigate(['/items', 'details', id]);
  }

  onNewItem() {
    this.router.navigate(['new']);
  }
}
