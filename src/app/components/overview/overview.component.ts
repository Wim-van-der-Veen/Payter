import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, Subject, Observable, of } from 'rxjs';

import { DataItem } from 'app/model';
import { DataService } from 'app/services/data';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  filter: FormGroup;
  filterValue = null;

  loading = false; // 20210529 WV whether or not loading indicator is visible
  items$: Observable<DataItem[]>;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loading = true; // 20210529 WV show loading indicator
    this.items$ = this.route.queryParams.pipe(
      tap(params => this.onFilter(<string>(<unknown>params))), // if filterparams are provided in the query-params, pass them on to onFilter
    )
    .pipe(
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

    this.filter = this.initForm();
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      search: this.formBuilder.control(null),
    });
  }


  onSelectItem(id: number) {
    this.router.navigate(['/items', 'details', id]);
  }

  onNewItem() {
    this.router.navigate(['new']);
  }

  onFilter(params?: any) {
    if (params && Object.keys(params).length) { // if filter-params provided, use these as specified and put it (JSON-ised) in the filter-input box
      this.filterValue = params;
      this.filter.controls['search'].setValue(JSON.stringify(params));
      return;
    }

    // else process input
    const input = this.filter.controls['search'].value;
    try {
      this.filterValue = JSON.parse(input); // try to parse as JSON
    }
    catch (e) { // if not JSON
      if (/[\{\}:"']/.test(input)) // simple test if it is JSON 'in progress'
        this.filterValue = null;
      else // if not JSON, use it as name-filter
        this.filterValue = { name: input };
    }
  }

}
