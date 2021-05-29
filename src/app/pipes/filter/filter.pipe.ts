import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {

  /**
   * transform
   *
   * @param {any[]} items
   * @param {object} searchObject
   * @returns {any[]}
   */
  transform(items: any[], searchObject: string): any[] {
    if (!items) // check if there are any items
      return [];

    const keys = searchObject ? Object.keys(searchObject) : [];
    if (!keys.length) // check if the searchObject really is an object with content
      return items;

    keys.forEach((key, index) => { // for each key in object
      if (!searchObject[key]) { // if it has no content, don't use it for filtering
        delete searchObject[key];
        keys.splice(index, 1);
      }
      else
        try { // try converting it to lower-case, if conversion errs just keep it like it is
          searchObject[key] = searchObject[key].toLocaleLowerCase();
        }
        catch(e) { }
    });
    if (!keys.length) // if no keys left, don't filter
      return items;

    return items.filter(item => { // for each key: check if it exists in the item and if the specified content is part of the (lower-case) value
      return !keys.some(key => !item[key] || !item[key].toLocaleLowerCase().includes(searchObject[key]));
    });
  }

}
