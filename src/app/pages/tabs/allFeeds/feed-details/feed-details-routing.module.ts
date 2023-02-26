import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {FeedDetailsPage} from './feed-details.page';

const routes: Routes = [
    {
        path: '',
        component: FeedDetailsPage
    },
    {
        path: ':id',
        pathMatch: "full",
        loadChildren: () => import('./feed-details.module').then(m => m.FeedDetailsPageModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeedDetailsPageRoutingModule {
}
