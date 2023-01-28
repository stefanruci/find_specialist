import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
   {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule)
  },

  {
    path: 'add-specialists',
    loadChildren: () => import('./add-specialists/add-specialists.module').then( m => m.AddSpecialistsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
