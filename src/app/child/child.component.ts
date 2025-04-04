import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone:true,
  template: `
    <div>
      <h3>Child Component</h3>
      <p>Received from parent: {{ parentData }}</p>
      <button (click)="notifyParent()">Notify Parent</button>
    </div>
  `
})
export class ChildComponent {
  @Input() parentData!: string;

  // Declare an output property that emits events to the parent
  @Output() childEvent = new EventEmitter<string>();

  notifyParent() {
    // Emit a string message to the parent component when button is clicked
    this.childEvent.emit('Hello Parent, this is your Child speaking!');
  }
}
