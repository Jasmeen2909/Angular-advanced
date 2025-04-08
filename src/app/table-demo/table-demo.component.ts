import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableTableComponent } from '../reusable-table/reusable-table.component';

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [CommonModule, ReusableTableComponent],
  template: `
    <h1>Table Demo</h1>
    <app-reusable-table
      [data]="myData"
      [displayedColumns]="['id', 'name', 'email']">
    </app-reusable-table>
  `,
  styles: [`
    h1 {
      text-align: center;
      margin-top: 20px;
    }
  `]
})
export class TableDemoComponent {
  myData = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com' },
    { id: 4, name: 'David Brown', email: 'david@example.com' },
    { id: 5, name: 'Eva Davis', email: 'eva@example.com' },
  ];
}
