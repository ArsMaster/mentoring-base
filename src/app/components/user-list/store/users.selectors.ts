import { createSelector } from "@ngrx/store";
import { User } from "../user-card/user-card.component";

interface UserState {
    users: User[];
}

interface AppState {
    users: UserState;
}

export const selectUsersFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(
    selectUsersFeature,
    (state: UserState) => state.users
);