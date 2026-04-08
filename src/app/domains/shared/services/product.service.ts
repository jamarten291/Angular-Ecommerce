import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(categoryId?: string) {
    const url = new URL(`${environment.apiUrl}/api/v1/products`);
    if (categoryId) {
      url.searchParams.set('categoryId', categoryId);
    }
    return this.http.get<Product[]>(url.toString());
  }

  getOne(id: string) {
    return this.http.get<Product>(`${environment.apiUrl}/api/v1/products/${id}`);
  }
}
