import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Modal overlay: only rendered if isOpen is true -->
    <div class="modal-overlay" *ngIf="isOpen" (click)="closeModal()">
      <!-- Modal content: clicking here does not propagate (so it doesn't close the modal) -->
      <div class="modal-content" (click)="$event.stopPropagation()">
        <!-- Close button inside the modal -->
        <button class="close-btn" (click)="closeModal()">X</button>
        <!-- Project any content passed into the modal -->
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal-content {
      background: #fff;
      padding: 20px;
      border-radius: 5px;
      position: relative;
      min-width: 300px;
      max-width: 80%;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .close-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      background: transparent;
      border: none;
      font-size: 18px;
      cursor: pointer;
    }
  `]
})
export class ModalComponent {

  @Input() isOpen: boolean = false;

  @Output() isOpenChange = new EventEmitter<boolean>();

  closeModal(): void {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }
}
