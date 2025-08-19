import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { userReducer } from './components/user-list/store/user.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todoReducer } from './components/todos-list/store-todos/todo.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './components/user-list/store/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
        users: userReducer,
        todos: todoReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([UserEffects])
]
};