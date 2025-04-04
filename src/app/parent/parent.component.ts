import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone:true,
  imports: [CommonModule, ChildComponent],
  template: `
    <div>
      <h2>Parent Component</h2>
      <p>Data sent to child: {{ messageToChild }}</p>
      <!-- Pass data to child using property binding and listen to the child's event -->
      <app-child [parentData]="messageToChild" (childEvent)="handleChildEvent($event)"></app-child>
      <p *ngIf="childMessage">Message from Child: {{ childMessage }}</p>
    </div>
  `
})
export class ParentComponent {
  // Data to pass to the child component
  messageToChild = 'Hello Child, this is your Parent!';
  
  // Variable to store message received from the child
  childMessage!: string;

  // This method is called when the child emits an event
  handleChildEvent(eventData: string) {
    this.childMessage = eventData;
  }
}
