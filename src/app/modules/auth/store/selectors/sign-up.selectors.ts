import { createSelector } from "@ngrx/store";
import { featureSelector } from "~/src/app/modules/auth/store/selectors/index";

export namespace SignUpSelectors {
  export const selectSignUpData = createSelector(featureSelector, (state) => state.auth.signUp);
  export const selectSignUpFirstName = createSelector(featureSelector, (state) => state.auth.signUp.firstName);
  export const selectSignUpLastName = createSelector(featureSelector, (state) => state.auth.signUp.lastName);
  export const selectSignUpEmail = createSelector(featureSelector, (state) => state.auth.signUp.email);
  export const selectSignUpPassword = createSelector(featureSelector, (state) => state.auth.signUp.password);
}
