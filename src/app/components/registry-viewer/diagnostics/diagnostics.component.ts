import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {DiagnosticsService} from "../../../service/diagnostics.service";

export class Group {
  level = 0;
  expanded = false;
  totalCounts = 0;
}

export class Diagnosis {
  name: string = '';
  date: string = '';
  condition: string = '';
  expanded: boolean;
}

// This is the example we follow https://stackblitz.com/edit/angular-material-table-row-grouping-expand-sort

@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.component.html',
  styleUrls: ['./diagnostics.component.css', '../registry-viewer.component.css']
})
export class DiagnosticsComponent implements OnInit {

  @Input() matCardContentHeight: number;

  public dataSource = new MatTableDataSource<any | Group>([]);

  columns: any[];
  displayedColumns: string[];
  groupByColumns: string[] = [];
  allData: any[];
  _allGroup: any[];

  expandedDiagnose: any[] = [];
  expandedSubDiagnose: Diagnosis[] = [];
  isExpandAllActive = false;
  isCollapseAllActive = false;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    protected dataSourceService: DiagnosticsService,
  ) {

    this.columns = [
      {
        field: 'date'
      },
      {
        field: 'condition'
      },
    ];
    this.displayedColumns = this.columns.map(column => column.field);
    this.groupByColumns = ['name'];

  }

// .subscribe({
//              next(data: any) {
//   this.dataSource = data.data;
//   console.log(this.dataSource);
// },
// error(err) {
//   console.error('something wrong occurred: ' + err);
// },
// }
// );
// }

  // ngOnInit() {
  //   this.dataSourceService.getAllData()
  //     .subscribe(
  //       (data: any) => {
  //         data.data.forEach((item, index) => {
  //           item.id = index + 1;
  //         });
  //         this.allData = data.data;
  //         this.dataSource.data = this.getGroups(this.allData, this.groupByColumns);
  //       },
  //       (err: any) => console.log(err)
  //     );
  // }


  ngOnInit() {
    this.dataSourceService.getAllData()
      .subscribe({
        next: (data: any) => {
          data.data.forEach((item, index) => {
            item.id = index + 1;
          });
          this.allData = data.data;
          this.dataSource.data = this.getGroups(this.allData, this.groupByColumns);
          this.onExpandAll();
        },
        error(err: any) {
          console.log(err)
        }
      })
  }


  onExpandAll() {
    this.isExpandAllActive = true;
    this.isCollapseAllActive = true;
    this.dataSource.data = this.addGroupsNew(this._allGroup, this.allData, this.groupByColumns, this.dataSource.data[0]);
    this.expandedDiagnose = this.dataSource.data[0];
  }

  onCollapseAll() {
    this.isExpandAllActive = false;
    this.isCollapseAllActive = true;
    this.dataSource.data = this.getGroups(this.allData, this.groupByColumns);
  }


  groupHeaderClick(row) {
    this.isExpandAllActive = false;
    this.isCollapseAllActive = false;
    if (row.expanded) {
      row.expanded = false;
      this.dataSource.data = this.getGroups(this.allData, this.groupByColumns);
    } else {
      row.expanded = true;
      this.expandedDiagnose = row;
      this.dataSource.data = this.addGroupsNew(this._allGroup, this.allData, this.groupByColumns, row);
    }
  }

  getGroups(data: any[], groupByColumns: string[]): any[] {
    const rootGroup = new Group();
    rootGroup.expanded = false;
    return this.getGroupList(data, 0, groupByColumns);
  }

  getGroupList(data: any[], level: number = 0, groupByColumns: string[]): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    let groups = this.uniqueBy(
      data.map(
        row => {
          const result = new Group();
          result.level = level + 1;
          for (let i = 0; i <= level; i++) {
            result[groupByColumns[i]] = row[groupByColumns[i]];
          }
          return result;
        }
      ),
      JSON.stringify);

    const currentColumn = groupByColumns[level];
    groups.forEach(group => {
      group.totalCounts = data.filter(row => group[currentColumn] === row[currentColumn]).length;
      this.expandedSubDiagnose = [];
    });
    groups = groups.sort((a: Diagnosis, b: Diagnosis) => {
      const isAsc = 'asc';
      return this.compare(a.condition, b.condition, isAsc);

    });
    this._allGroup = groups;
    return groups;
  }

  addGroupsNew(allGroup: any[], data: any[], groupByColumns: string[], dataRow: any): any[] {
    const rootGroup = new Group();
    rootGroup.expanded = true;
    return this.getSublevelNew(allGroup, data, 0, groupByColumns, rootGroup, dataRow);
  }

  getSublevelNew(allGroup: any[], data: any[], level: number, groupByColumns: string[], parent: Group, dataRow: any): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    const currentColumn = groupByColumns[level];
    let subGroups = [];
    allGroup.forEach(group => {
      const rowsInGroup = data.filter(row => group[currentColumn] === row[currentColumn]);
      group.totalCounts = rowsInGroup.length;

      if (this.isExpandAllActive || group.name == dataRow.name.toString()) {
        group.expanded =  dataRow.expanded;
        const subGroup = this.getSublevelNew(allGroup, rowsInGroup, level + 1, groupByColumns, group, dataRow.name.toString());
        this.expandedSubDiagnose = subGroup;
        subGroup.unshift(group);
        subGroups = subGroups.concat(subGroup);
      }
      else {
        subGroups = subGroups.concat(group);
      }
    });
    return subGroups;
  }

  uniqueBy(a, key) {
    const seen = {};
    return a.filter((item) => {
      const k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  isGroup(index, item): boolean {
    return item.level;
  }

  onSortData(sort: Sort) {
    let data = this.allData;
    const index = data.findIndex(x => x['level'] == 1);
    if (sort.active && sort.direction !== '') {
      if (index > -1) {
        data.splice(index, 1);
      }

      data = data.sort((a: Diagnosis, b: Diagnosis) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'name':
            return this.compare(a.name, b.name, isAsc);
          case 'date':
            return this.compare(a.date, b.date, isAsc);
          case 'condition':
            return this.compare(a.condition, b.condition, isAsc);
          default:
            return 0;
        }
      });
    }
    this.dataSource.data = this.addGroupsNew(this._allGroup, data, this.groupByColumns, this.expandedDiagnose);
  }

  private compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
