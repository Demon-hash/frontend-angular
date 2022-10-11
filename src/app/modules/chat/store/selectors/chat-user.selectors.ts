import { createSelector } from "@ngrx/store";
import { featureSelector } from "~/src/app/modules/chat/store/selectors/index";

export namespace ChatUserSelectors {
  export const selectUser = createSelector(featureSelector, (state) => state.chat.user);
}
