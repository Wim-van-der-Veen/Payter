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

  $item: Subject<DataItem> = new BehaviorSubject<DataItem>(null);

  constructor(
      private dataService: DataService,
      private router: Router,
      private route: ActivatedRoute,
    ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params.id);
      this.dataService.getItem(id).subscribe(item => {
        this.$item.next(item);
      }, err => {
        this.$item.next(null);
        console.log(err);
      });
    });
  }

}
