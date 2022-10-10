import { createSelector } from "@ngrx/store";
import { featureSelector } from "~/src/app/modules/auth/store/selectors/index";

export namespace LoginSelectors {
  export const selectLoginData = createSelector(featureSelector, (state) => state.auth.login);
  export const selectLoginEmail = createSelector(featureSelector, (state) => state.auth.login.email);
  export const selectLoginPassword = createSelector(featureSelector, (state) => state.auth.login.password);
}
