import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      // Return the IDs of the known blog posts
      return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
