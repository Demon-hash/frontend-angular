import { createFeatureSelector, createSelector } from "@ngrx/store";
import { feature } from "~/src/app/modules/auth/store";
import { IAuthState } from "~/src/app/types";

export const featureSelector = createFeatureSelector<IAuthState>(feature);
export const selectError = createSelector(featureSelector, (state) => state.auth.error);
export const selectAccessToken = createSelector(featureSelector, (state) => state.auth.access_token);
export const selectRefreshToken = createSelector(featureSelector, (state) => state.auth.refresh_token);
export const selectTokens = createSelector(
  featureSelector,
  selectAccessToken,
  selectRefreshToken,
  (state, access, refresh) => {
    return { access, refresh }
  }
);
