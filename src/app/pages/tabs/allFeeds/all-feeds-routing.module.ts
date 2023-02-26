import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AllFeedsPage} from './all-feeds.page';

const routes: Routes = [
    {
        path: '',
        component: AllFeedsPage
    },
    {
        path: ':user-type',
        component: AllFeedsPage
    },
    {
        path: 'feed-details',
        loadChildren: () => import('./feed-details/feed-details.module').then(m => m.FeedDetailsPageModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AllFeedsPageRoutingModule {
}
