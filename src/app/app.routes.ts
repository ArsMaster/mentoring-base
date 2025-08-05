import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UserComponent } from './components/user-list/user-list.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { authGuard } from './auth.guard';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'todos',
        component: TodosListComponent
    },
    {
        path: 'admin',
        component: AdminComponent, canActivate: [authGuard]
    }
];

