import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

export interface TaskData {
  id: number;
  name: string;
  description: string;
  status: number,
  status_name: string,
  start_at: string;
  finish_at: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Task List Tool';
  filterName = '';
  statuses = ['Finished', 'Scheduled', 'None'];
  selectedStatusFilter = 'None';
  // dataSource: MatTableDataSource<TaskData>;
  updatedDataSource = null;
  dataSource = null;
  displayedColumns = ['id', 'name', 'description', 'status', 'start_at', 'finish_at', 'action'];
  testData = [
    {
      id: 1,
      name: 'task1',
      description: 'this is task1',
      status: 0,
      start_at: '2018-12-10 21:13:50',
      finish_at: '2018-12-10 21:13:50'
    }, {
      id: 2,
      name: 'demo1',
      description: 'this is demo1',
      status: 1,
      start_at: '2018-12-10 21:13:50',
      finish_at: '2018-12-10 21:13:50'
    }, {
      id: 3,
      name: 'task2',
      description: 'this is task2',
      status: 0,
      start_at: '2018-12-10 21:13:50',
      finish_at: '2018-12-10 21:13:50'
    }, {
      id: 4,
      name: 'demo2',
      description: 'this is demo2',
      status: 0,
      start_at: '2018-12-10 21:13:50',
      finish_at: '2018-12-10 21:13:50'
    }
  ];

  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.updatedDataSource = this.testData.concat();
    this.dataSource = this.testData.concat();
    this.dataSource.sort = this.sort;
  }

  handleFilterTasks() {
    let filterDataSource = this.updatedDataSource.concat();
    if (this.filterName.length > 0) {
      filterDataSource = this.updatedDataSource.filter(x => x.name.trim().toLowerCase().split(this.filterName.trim().toLowerCase()).length > 1);
    }

    const filterStatus = this.statuses.indexOf(this.selectedStatusFilter);
    if (filterStatus < 2) {
      const currentFilterStatus = filterStatus === 0 ? 1 : 0;
      filterDataSource = filterDataSource.filter(x => x.status === currentFilterStatus);
    }

    this.dataSource = filterDataSource;
    this.dataSource.sort = this.sort;
  }

  handleDeleteClick(item) {
    const index = this.dataSource.indexOf(item);
    this.dataSource.splice(index, 1);
    this.dataSource = JSON.parse(JSON.stringify(this.dataSource));
    this.dataSource.sort = this.sort;
  }
}
