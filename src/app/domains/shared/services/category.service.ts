import { Injectable } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  async getCategories(): Promise<Category[]> {
    return await fetch(`${environment.apiUrl}/api/v1/categories`)
      .then((response) => response.json())
      .then((data: Category[]) => data);
  }
}
