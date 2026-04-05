import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog',
    renderMode: RenderMode.Client,
  },
  {
    path: 'blog/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'readme',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
