import { Pipe, PipeTransform } from '@angular/core';
import { Posts } from '../model/app.model';

@Pipe({
  name: 'filter-search',
})
export class FilterPipe implements PipeTransform {
  transform(posts: Posts[], searchText: string, searchField: string): any[] {
    if (!posts) {
      return [];
    }
    if (!searchText || !searchField) {
      return null;
    }
    searchField = searchField.toLowerCase();
    switch (searchField) {
      case 'title':
        return posts.filter((p) => {
          return p.title.toLocaleLowerCase().includes(searchText);
        });
        break;
      case 'body':
        return posts.filter((p) => {
          return p.body.toLocaleLowerCase().includes(searchText);
        });
        break;
    }
  }
}
