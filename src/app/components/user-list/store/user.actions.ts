import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../user-card/user-card.component";

export const UserActions = createActionGroup({
    source: 'Users',
    events: {
        'set': props<{ users: User[] }>(),
        'edit': props<{ user: User }>(),
        'create': props<{ user: User }>(),
        'delete': props<{ id: number }>(),

        'Load Users': emptyProps(),
        'Load Users Success': props<{ users: User[] }>(),
        'Load Users Failure': props<{ error: string }>(),
    },
});