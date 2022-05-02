import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultiSortTableService {

  /**
   * Our users requested a multi-sort table, and we implemented a solution based on
   * a third party code: https://github.com/Maxl94/ngx-multi-sort-table
   *
   * An example solution we used for our implementation can be found here:
   * https://stackblitz.com/edit/angular-vf7brq?file=src%2Fapp%2Ftable-sorting-example.ts
   * We refactored only the name of the variables in this service to better match our
   * implementation.
   */

  constructor() { }

  list(sorting: string[] = [], dirs: string[] = [], page = 0, pagesize = 20, data) {
    const tempTableData = Object.assign([], data);
    const result = {
      tableData: [],
      page: page,
      pagesize: pagesize,
      totalElements: tempTableData.length
    };

    if (sorting.length === 0) {
      result.tableData = tempTableData.slice(page * pagesize, (page + 1) * pagesize);
    } else if (sorting.length > 0) {
      const sortedTableData = tempTableData.sort((u1, u2) => {
        return this._sortData(u1, u2, sorting, dirs);
      });
      result.tableData = sortedTableData.slice(page * pagesize, (page + 1) * pagesize);
    }

    return result;
  }

  _sortData(
    d1: any,
    d2: any,
    sorting: string[],
    dirs: string[]
  ): number {
    if (d1[sorting[0]] > d2[sorting[0]]) {
      return dirs[0] === "asc" ? 1 : -1;
    } else if (d1[sorting[0]] < d2[sorting[0]]) {
      return dirs[0] === "asc" ? -1 : 1;
    } else {
      if (sorting.length > 1) {
        sorting = sorting.slice(1, sorting.length);
        dirs = dirs.slice(1, dirs.length);
        return this._sortData(d1, d2, sorting, dirs);
      } else {
        return 0;
      }
    }
  }
}
