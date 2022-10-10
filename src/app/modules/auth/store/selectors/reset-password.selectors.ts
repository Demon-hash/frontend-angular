import { createSelector } from "@ngrx/store";
import { featureSelector } from "~/src/app/modules/auth/store/selectors/index";

export namespace ResetPasswordSelectors {
  export const selectResetPasswordData = createSelector(featureSelector, (state) => state.auth.reset);
  export const selectResetPasswordEmail = createSelector(featureSelector, (state) => state.auth.reset.email);
  export const selectResetPasswordCode = createSelector(featureSelector, (state) => state.auth.reset.code);
}
