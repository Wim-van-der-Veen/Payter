import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Crumb } from './crumb.interface';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() $crumbs: Observable<Crumb>;

  constructor() { }

  ngOnInit(): void {
  }

}
