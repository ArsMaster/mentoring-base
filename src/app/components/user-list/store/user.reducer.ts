import { createReducer, on } from "@ngrx/store";
import { UserActions } from "./user.actions";
import { User } from "../user-card/user-card.component";

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.loadUsers, (state) => ({ 
        ...state, 
        loading: true, 
        error: null 
    })),
    on(UserActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        users,
        loading: false
    })),
    on(UserActions.loadUsersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(UserActions.set, (state, payload) => ({
        ...state,
        users: payload.users,
    })),
    on(UserActions.edit, (state, payload) => ({
        ...state,
        users: state.users.map((user) => {
            if (user.id === payload.user.id) {
                return payload.user;
            } else {
                return user;
            }
        }),
    })),
    on(UserActions.create, (state, payload) => ({
        ...state,
        users: [...state.users, payload.user],
    })),
    on(UserActions.delete, (state, payload) => ({
        ...state,
    users: state.users.filter((user) => user.id !== payload.id),
    }))
);