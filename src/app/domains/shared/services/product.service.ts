import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(params: { categorySlug?: string }) {
    const url = new URL(`${environment.apiUrl}/api/v1/products`);
    if (params.categorySlug) {
      url.searchParams.set('categorySlug', params.categorySlug);
    }
    return this.http.get<Product[]>(url.toString());
  }

  getOneById(id: string) {
    return this.http.get<Product>(`${environment.apiUrl}/api/v1/products/${id}`);
  }

  getOneBySlug(slug: string) {
    return this.http.get<Product>(`${environment.apiUrl}/api/v1/products/slug/${slug}`);
  }
}
