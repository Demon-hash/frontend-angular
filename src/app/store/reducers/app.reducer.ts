import { createReducer } from "@ngrx/store";

const initial = {
  user: {
    firstName: "",
    lastName: ""
  }
}

export const appReducer = createReducer(
  initial
);
