import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ChildComponent } from '../child/child.component';
import { AutoFocusDirective } from '../auto-focus.directive';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ChildComponent,
    AutoFocusDirective,
    ModalComponent
  ],
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
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

  // Variable to control the modal state
  modalOpen = false;

  openModal(): void {
    this.modalOpen = true;
  }
}
