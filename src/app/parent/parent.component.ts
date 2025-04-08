import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from '../child/child.component';
import { AutoFocusDirective } from '../auto-focus.directive';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-parent',
  standalone:true,
  imports: [CommonModule, ChildComponent, AutoFocusDirective, ModalComponent],
  template: `
    <div>
      <h2>Parent Component</h2>
      <p>Data sent to child: {{ messageToChild }}</p>
      <!-- Pass data to child using property binding and listen to the child's event -->
      <app-child [parentData]="messageToChild" (childEvent)="handleChildEvent($event)"></app-child>
      <p *ngIf="childMessage">Message from Child: {{ childMessage }}</p>
      <h3>Auto-Focus Demo</h3>
      <input type="text" placeholder="I will auto-focus" appAutoFocus>
      <h3>Modal Demo</h3>
      <button (click)="openModal()">Open Modal</button>
      <app-modal [(isOpen)]="modalOpen">
        <h3>Modal Title</h3>
        <p>This is some modal content</p>
        <button (click)="modalOpen=false">Close modal</button>
      </app-modal>
    </div>
  `,
  styles:[`
  h1{ text-align: center; }
  button { margin:10px }
  `]
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

  //Variable to control the modal state.
  modalOpen = false;

  openModal(): void {
    this.modalOpen = true;
  }
}

