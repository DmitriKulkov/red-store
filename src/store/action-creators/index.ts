import * as FiltersActionCreators from "./filters";
import * as TitleActionsCreators from "./title";
import * as CartActionCreators from "./cart-items";

export default {
  ...FiltersActionCreators,
  ...TitleActionsCreators,
  ...CartActionCreators,
};
