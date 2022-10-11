import { createFeatureSelector, createSelector } from "@ngrx/store";
import { feature } from "~/src/app/modules/chat/store";
import { IChatState } from "~/src/app/types";

export const featureSelector = createFeatureSelector<IChatState>(feature);
export const selectError = createSelector(featureSelector, (state) => state.chat.error);
