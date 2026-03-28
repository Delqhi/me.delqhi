import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReadmeComponent } from './readme/readme.component';
import { BlogComponent } from './blog/blog.component';
import { BlogPostComponent } from './blog-post/blog-post.component';

export const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogPostComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'readme', component: ReadmeComponent },
  { path: '**', redirectTo: '' }
];
