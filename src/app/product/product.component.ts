import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  template: `
    <div>
      <h2>Product Details:</h2>
      <p>Product Id: {{productId}}</p>
      <p>Reference: {{ref}}</p>
    </div>
  `
})
export class ProductComponent implements OnInit{
  productId!: string;
  ref!: string;

  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.ref = this.route.snapshot.queryParamMap.get('ref')!;
  }

}
