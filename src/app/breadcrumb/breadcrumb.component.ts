import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface IBreadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="breadcrumb-container">
      <ul class="breadcrumb-list">
        <li *ngFor="let crumb of breadcrumbs; let last = last">
          <ng-container *ngIf="!last; else currentRoute">
            <a [routerLink]="crumb.url">{{ crumb.label }}</a>
            <span class="separator">/</span>
          </ng-container>
          <ng-template #currentRoute>
            <span class="current">{{ crumb.label }}</span>
          </ng-template>
        </li>
      </ul>
    </nav>
  `,
  styles: `
  .breadcrumb-container {
  padding: 10px;
  background: #eee;
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
}
.breadcrumb-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}
.breadcrumb-list li {
  margin-right: 8px;
}
.breadcrumb-list a {
  text-decoration: none;
  color: blue;
  border: 1px solid red;
  padding: 4px 8px;
  border-radius: 4px;
}
.separator {
  margin-right: 8px;
}
.current {
  font-weight: bold;
  color: black;
  padding: 4px 8px;
}
  `,
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: IBreadcrumb[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root, '');
        console.log('Breadcrumbs:', this.breadcrumbs);
      });

    this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root, '');
  }

  buildBreadcrumbs(
    route: ActivatedRoute,
    url: string,
    breadcrumbs: IBreadcrumb[] = []
  ): IBreadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');

      const nextUrl = routeURL ? url + '/' + routeURL : url;

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url: nextUrl || '/' });
      }

      this.buildBreadcrumbs(child, nextUrl, breadcrumbs);
    }
    return breadcrumbs;
  }
}
