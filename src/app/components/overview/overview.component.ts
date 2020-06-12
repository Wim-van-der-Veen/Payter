import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { DataItem } from 'app/model';
import { DataService } from 'app/services/data';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  items$: Observable<DataItem[]>;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.items$ = this.route.queryParams.pipe(
      // TODO implement filter here
      switchMap(() => this.dataService.listItems())
    );
  }

  onSelectItem(id: number) {
    this.router.navigate(['/items', 'details', id]);
  }

  onNewItem() {
    this.router.navigate(['new']);
  }
}
