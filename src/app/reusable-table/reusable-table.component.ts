import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-reusable-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  template: `
    <div class="table-container">
      <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">

        <!-- Dynamically generate columns based on the input array -->
        <ng-container *ngFor="let column of displayedColumns" [matColumnDef]="column">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            {{ column | titlecase }}
          </th>
          <td mat-cell *matCellDef="let element">
            {{ element[column] }}
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
    </div>
  `,
  styles: [`
    .table-container { margin: 20px; }
    table { width: 100%; }
  `]
})
export class ReusableTableComponent implements AfterViewInit {

  @Input() data: any[] = [];

  @Input() displayedColumns: string[] = [];

  dataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    // When the view initializes, assign paginator and sorting.
    // (If the data input might change later, you may need additional subscriptions.)
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
