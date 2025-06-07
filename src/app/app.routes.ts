import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UserComponent } from './components/user/user.component';
import { TodosListComponent } from './components/todos/todos-list.component';

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
    }
];

