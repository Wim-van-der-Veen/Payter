import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { DataItem } from '../../model';

const MOCK_ITEMS: DataItem[] = [
  { id: 1, name: 'item1', description: 'first item'},
  { id: 2, name: 'second item', description: 'this item comes after the first item'},
  { id: 3, name: 'another item', description: 'we have lots of items'},
  { id: 23, name: 'bonus item', description: 'this item is extra'},
  { id: 51, name: 'cool item', description: 'this item is ice cold'},
  { id: 46, name: 'hot item', description: 'this item is blazing'},
  { id: 16, name: 'replacement item', description: 'this item is not important'},
  { id: 32, name: 'cool item', description: 'this item is ice cold'},
];

@Injectable()
export class DataService {

  private items: Map<number, DataItem> = new Map<number, DataItem>();

  constructor() {
    MOCK_ITEMS.forEach(item => {
      this.items.set(item.id, item);
    });
  }

  listItems(): Observable<DataItem[]> {
    const values = Array.from(this.items.values());
    return of(values).pipe(delay(this.delay()));
  }

  getItem(id: number): Observable<DataItem> {
    return of(this.items.get(id)).pipe(delay(this.delay()));
  }

  createItem(item: DataItem): Observable<DataItem> {
    item.id = this.generateId();
    this.items.set(item.id, item);
    return of(item).pipe(delay(this.delay()));
  }

  deleteItem(item: DataItem): Observable<void> {
    this.items.delete(item.id);
    return of(null);
  }

  private generateId(): number {
    let id = 0;
    if (this.items.size >= 100) {
      throw new Error('cannot add any more items');
    }
    do {
      id = Math.floor(Math.random() * 100) + 1;
    } while (this.items.has(id));
    return id;
  }

  private delay() {
    return Math.floor(Math.random() * 1000);
  }
}
