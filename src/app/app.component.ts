import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ParentComponent, BreadcrumbComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-advanced';
}
