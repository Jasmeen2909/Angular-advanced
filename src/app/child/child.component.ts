import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface CanComponentDeactivate{
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Component({
  selector: 'app-child',
  standalone:true,
  template: `
    <div>
    <a routerLink="/">Go to Home</a>
      <h3>Child Component</h3>
      <p>Received from parent: {{ parentData }}</p>
      <button (click)="notifyParent()">Notify Parent</button>

      <button (click)="navigateAway()">Go to Home (Programmatic)</button>

      <button (click)="toggleUnsavedChanges()">Toggle Unsaved changes ({{ hasUnsavedChanges }})
      </button>
    </div>
  `
})
export class ChildComponent implements CanComponentDeactivate{
  @Input() parentData!: string;

  // Declare an output property that emits events to the parent
  @Output() childEvent = new EventEmitter<string>();

  //flag to stimulate unsaved changes
  hasUnsavedChanges: boolean = false;

  constructor(private router: Router){}

  notifyParent() {
    // Emit a string message to the parent component when button is clicked
    this.childEvent.emit('Hello Parent, this is your Child speaking!');
  }

  toggleUnsavedChanges(){
    this.hasUnsavedChanges = !this.hasUnsavedChanges;
  }

  navigateAway() {
    this.router.navigate(['/']);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean{
    if(this.hasUnsavedChanges){
      return window.confirm('You have unsaved changes! do you want to leave?');
    }
    return true;
  }
}
