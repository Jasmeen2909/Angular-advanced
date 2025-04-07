import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  // Use a very simple template—a container for our breadcrumb HTML.
  template: `<nav id="breadcrumbContainer"></nav>`,
  styles: [`
    nav {
      padding: 10px;
      background: #f8f8f8;
      font-family: Arial, sans-serif;
    }
    a {
      border: 1px solid red;
      padding: 4px 8px;
      text-decoration: none;
      margin-right: 5px;
      cursor: pointer;
      color: blue;
    }
  `]
})
export class BreadcrumbComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    // Rebuild breadcrumbs on every NavigationEnd event.
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.buildBreadcrumbs();
      });
  }

  ngAfterViewInit(): void {
    // Initial build after the view loads.
    this.buildBreadcrumbs();
  }

  // Build breadcrumbs without using Angular template directives.
  buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    console.log('Visiting route:', route.snapshot.url.map(s => s.path).join('/'));
    const children = route.children;
    if (!children.length) {
      console.log('No children, returning', breadcrumbs);
      return breadcrumbs;
    }
  
    for (const child of children) {
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      const nextUrl = routeURL ? `${url}/${routeURL}` : url;
      const label = child.snapshot.data['breadcrumb'];
      console.log('Child routeURL:', routeURL, 'Label:', label);
      if (label) {
        breadcrumbs.push({ label, url: nextUrl });
      }
      return this.buildBreadcrumbs(child, nextUrl, breadcrumbs);
    }
    return breadcrumbs;
  }
  

  // Recursive function to build an array of breadcrumbs.
  getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    console.log('Visiting route:', route.snapshot.url.map(s => s.path).join('/'), 'Data:', route.snapshot.data);
    const label = route.snapshot.data['breadcrumb'];
    const routeURL = route.snapshot.url.map(segment => segment.path).join('/');
    const nextUrl = routeURL ? (url ? `${url}/${routeURL}` : `/${routeURL}`) : url;
  
    if (label) {
      breadcrumbs.push({ label, url: nextUrl });
    }
  
    route.children.forEach(child => {
      breadcrumbs = this.getBreadcrumbs(child, nextUrl, breadcrumbs);
    });
  
    return breadcrumbs;
  }
  
}
