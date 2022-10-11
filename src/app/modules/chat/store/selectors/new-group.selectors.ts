import { createSelector } from "@ngrx/store";
import { featureSelector } from "~/src/app/modules/chat/store/selectors/index";

export namespace NewGroupSelectors {
  export const selectNewGroupId = createSelector(featureSelector, (state) => state.chat.group.id);
}
