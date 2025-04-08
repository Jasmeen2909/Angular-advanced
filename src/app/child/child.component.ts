import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

export interface CanComponentDeactivate{
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements CanComponentDeactivate {
  @Input() parentData!: string;
  @Output() childEvent = new EventEmitter<string>();

  hasUnsavedChanges: boolean = false;

  constructor(private router: Router) {}

  notifyParent() {
    this.childEvent.emit('Hello Parent, this is your Child speaking!');
  }

  toggleUnsavedChanges() {
    this.hasUnsavedChanges = !this.hasUnsavedChanges;
  }

  // Route guard check
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.hasUnsavedChanges) {
      return window.confirm('You have unsaved changes! Do you really want to leave?');
    }
    return true;
  }

  goToProduct() {
    this.router.navigate(['/product', 123], {
      queryParams: { ref: 'email' }
    });
  }
}
