import { Injectable } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  async getProducts(params: { categorySlug?: string }): Promise<Product[]> {
    const url = new URL(`${environment.apiUrl}/api/v1/products`);
    if (params.categorySlug) {
      url.searchParams.set('categorySlug', params.categorySlug);
    }
    return await fetch(url.toString())
      .then((response) => response.json())
      .then((data: Product[]) => data);
  }

  async getOneById(id: string): Promise<Product> {
    return await fetch(`${environment.apiUrl}/api/v1/products/${id}`)
      .then((response) => response.json())
      .then((data: Product) => data);
  }

  async getOneBySlug(slug: string): Promise<Product> {
    return await fetch(`${environment.apiUrl}/api/v1/products/slug/${slug}`)
      .then((response) => response.json())
      .then((data: Product) => data);
  }
}
