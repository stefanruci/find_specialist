import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from 'src/app/guards/auth/auth.guard';

import {MenuPage} from './menu.page';

const routes: Routes = [
    {
        path: "",
        canActivate: [AuthGuard],
        component: MenuPage,

    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MenuPageRoutingModule {
}
