import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, BehaviorSubject } from 'rxjs';

import { DataItem } from 'app/model';
import { DataService } from 'app/services/data';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {

  loading = false; // 20210529 WV whether or not loading indicator is visible
  $item: Subject<DataItem> = new BehaviorSubject<DataItem>(null);

  constructor(
      private dataService: DataService,
      private router: Router,
      private route: ActivatedRoute,
    ) {}

  ngOnInit() {
    this.loading = true; // 20210529 WV show loading indicator
    this.route.params.subscribe(params => {
      const id = Number(params.id);
      this.dataService.getItem(id).subscribe(item => {
        this.$item.next(item);
        this.loading = false; // 20210529 WV clear loading indicator
      }, err => {
        this.$item.next(null);
        console.log(err);
        this.loading = false; // 20210529 WV clear loading indicator
      });
    });
  }

}
