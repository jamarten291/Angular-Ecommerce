import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  getCategories() {
    return this.http.get<Category[]>(`${environment.apiUrl}/api/v1/categories`);
  }

  getOneBySlug(slug: string) {
    return this.http.get<Category>(`${environment.apiUrl}/api/v1/categories/slug/${slug}`);
  }
}
