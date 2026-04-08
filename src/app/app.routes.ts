import { Routes } from '@angular/router';
import { NotFound } from '@info/pages/not-found/not-found';
import { Layout } from '@shared/components/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () => import('@products/pages/list/list.component'),
      },
      {
        path: 'about',
        loadComponent: () => import('./domains/info/pages/about/about.component'),
      },
      {
        path: 'product/:id',
        loadComponent: () => import('@products/pages/product-detail/product-detail'),
      },
    ],
  },
  {
    path: '**',
    component: NotFound,
  },
];
