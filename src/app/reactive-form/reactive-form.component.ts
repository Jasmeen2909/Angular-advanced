import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


function forbiddenNameValidator(forbiddenName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = control.value === forbiddenName;
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
      <!-- Name Field with custom validator -->
      <mat-form-field appearance="fill">
        <mat-label>Name</mat-label>
        <input matInput placeholder="Enter your name" formControlName="name" />
        <mat-error *ngIf="nameControl.hasError('required')">
          Name is required.
        </mat-error>
        <mat-error *ngIf="nameControl.hasError('forbiddenName')">
          The name "{{ nameControl.value }}" is forbidden.
        </mat-error>
      </mat-form-field>

      <!-- Email Field -->
      <mat-form-field appearance="fill">
        <mat-label>Email</mat-label>
        <input matInput placeholder="Enter your email" formControlName="email" />
        <mat-error *ngIf="emailControl.hasError('required')">
          Email is required.
        </mat-error>
        <mat-error *ngIf="emailControl.hasError('email')">
          Please enter a valid email.
        </mat-error>
      </mat-form-field>

      <!-- Password Field -->
      <mat-form-field appearance="fill">
        <mat-label>Password</mat-label>
        <input matInput placeholder="Enter your password" formControlName="password" type="password" />
        <mat-error *ngIf="passwordControl.hasError('required')">
          Password is required.
        </mat-error>
        <mat-error *ngIf="passwordControl.hasError('minlength')">
          Password must be at least 6 characters long.
        </mat-error>
      </mat-form-field>

      <!-- FormArray: Dynamic Phone Numbers -->
      <div formArrayName="phoneNumbers">
        <div *ngFor="let phoneControl of phoneNumbers.controls; let i = index">
          <mat-form-field appearance="fill">
            <mat-label>Phone Number {{ i + 1 }}</mat-label>
            <input matInput [formControlName]="i" placeholder="Enter phone number" />
            <mat-error *ngIf="phoneControl.hasError('required')">
              Phone number is required.
            </mat-error>
          </mat-form-field>
          <button mat-raised-button color="warn" type="button" (click)="removePhoneNumber(i)">
            Remove
          </button>
        </div>
      </div>
      <button mat-raised-button type="button" (click)="addPhoneNumber()">
        Add Phone Number
      </button>

      <!-- Submit Button -->
      <div style="margin-top: 20px;">
        <button mat-raised-button color="primary" type="submit" [disabled]="myForm.invalid">
          Submit
        </button>
      </div>
    </form>

    <!-- Display form value for debugging -->
    <pre>{{ myForm.value | json }}</pre>
  `,
  styles: [`
    form {
      max-width: 600px;
      margin: 20px auto;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    mat-form-field {
      width: 100%;
    }
    button {
      margin-top: 10px;
    }
  `]
})
export class ReactiveFormComponent implements OnInit {
  myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required, forbiddenNameValidator('Test')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      phoneNumbers: new FormArray([
        new FormControl('', Validators.required)
      ])
    });
  }

  get nameControl() {
    return this.myForm.get('name') as FormControl;
  }

  get emailControl() {
    return this.myForm.get('email') as FormControl;
  }

  get passwordControl() {
    return this.myForm.get('password') as FormControl;
  }

  get phoneNumbers() {
    return this.myForm.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber(): void {
    this.phoneNumbers.push(new FormControl('', Validators.required));
  }

  removePhoneNumber(index: number): void {
    if (this.phoneNumbers.length > 1) {
      this.phoneNumbers.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form Submitted:', this.myForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
